# Safety contract (aligns with harness_core)

- Never write or flash `.tbw`. Apply changes in TMax Tuner.
- M8 timing ceiling 38 degrees (tighter with high CR). Twin Cam 42 degrees.
- Do not lock AutoTune trims at 330-345F.
- Do not put 17AUG maps onto 6.3 injectors.
- House rules cannot be overridden.
- Experiment kinds include auto_support_collection and official Mod map retrieve/write.
- Decision sequence: temporal link and graph retrieve before diagnose; Safety Gate before respond.
