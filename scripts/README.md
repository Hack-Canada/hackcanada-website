# scripts

## generate-collision-masks.py

Generates 32x32 `Uint32Array` collision masks for the beaver game. Each mask is 32 uint32 values (one per row, bit N = column N).

- **Beaver mask**: Scans all 4 beaver sprite frames, unions their opaque pixels (alpha > 30), accounts for `object-contain` rendering (3:4 portrait in square container).
- **Obstacle masks**: Scans each `*-r.png` in the obstacles directory, generates a per-photo silhouette mask.

```bash
pip install Pillow  # if you don't have it
python3 scripts/generate-collision-masks.py
```

Outputs:
- `web/lib/beaverCollisionMask.ts`
- `web/lib/obstacleCollisionMasks.ts`

Run this whenever the beaver sprites or obstacle photos change.
