import cv2
import os
import sys
import time
from concurrent.futures import ThreadPoolExecutor

def extract_frames(video_path, output_dir, target_count=380, width=1280, height=720, quality=72):
    if not os.path.exists(video_path):
        print(f"Error: Video file not found at {video_path}")
        sys.exit(1)
        
    os.makedirs(output_dir, exist_ok=True)
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print(f"Error: Failed to open video {video_path}")
        sys.exit(1)
        
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    duration = total_frames / fps if fps > 0 else 0
    print(f"Master Video: {total_frames} frames, {fps:.1f} FPS, {duration:.2f}s duration")
    print(f"Extracting {target_count} frames to '{output_dir}' at {width}x{height} (WebP q={quality})...")

    # Pre-calculate exact frame indices to extract
    target_indices = set(round(i * (total_frames - 1) / (target_count - 1)) for i in range(target_count))
    sorted_targets = sorted(list(target_indices))
    # Map frame index in video -> output frame number (1-indexed: 1..target_count)
    idx_to_out = {v_idx: out_idx + 1 for out_idx, v_idx in enumerate(sorted_targets)}
    
    t0 = time.time()
    def save_task(out_idx, frame_data):
        resized = cv2.resize(frame_data, (width, height), interpolation=cv2.INTER_LINEAR)
        out_filename = os.path.join(output_dir, f"frame_{out_idx:04d}.webp")
        cv2.imwrite(out_filename, resized, [cv2.IMWRITE_WEBP_QUALITY, quality])

    max_workers = min(8, os.cpu_count() or 4)
    with ThreadPoolExecutor(max_workers=max_workers) as pool:
        futures = []
        current_frame_idx = 0
        extracted_count = 0
        
        while True:
            if current_frame_idx in idx_to_out:
                ret, frame = cap.read()
                if not ret:
                    break
                out_idx = idx_to_out[current_frame_idx]
                futures.append(pool.submit(save_task, out_idx, frame))
                extracted_count += 1
                if extracted_count % 50 == 0 or extracted_count == len(sorted_targets):
                    print(f"Progress: {extracted_count}/{len(sorted_targets)} frames submitted...")
            else:
                ret = cap.grab()
                if not ret:
                    break
            current_frame_idx += 1
            if current_frame_idx > sorted_targets[-1]:
                break

        print("Waiting for all frames to be encoded and saved...")
        for f in futures:
            f.result()
            
    cap.release()
    elapsed = time.time() - t0
    print(f"Completed! Extracted {len(sorted_targets)} frames in {elapsed:.2f}s.")

if __name__ == "__main__":
    v_path = sys.argv[1] if len(sys.argv) > 1 else "public/media/TV.mp4"
    out_dir = sys.argv[2] if len(sys.argv) > 2 else "public/media/frames"
    t_count = int(sys.argv[3]) if len(sys.argv) > 3 else 380
    w = int(sys.argv[4]) if len(sys.argv) > 4 else 1920
    h = int(sys.argv[5]) if len(sys.argv) > 5 else 1080
    q = int(sys.argv[6]) if len(sys.argv) > 6 else 85
    extract_frames(v_path, out_dir, target_count=t_count, width=w, height=h, quality=q)
