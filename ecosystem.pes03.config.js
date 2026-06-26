// Third miner on hotkey pes03 (uid 104) — serves v6 for a clean 3-way live A/B:
//   pes01 (uid102) = v4  (BumpModel trees + topk, frac 0.15)
//   pes02 (uid107) = v5  (stacked pipeline + topk, frac 0.15, 293 feats)
//   pes03 (uid104) = v6  (stacked pipeline + cx_ collision feats + topk, frac 0.15, 304 feats)
// v6 holdout AP 0.9425 vs v5 0.919 at ~equal latency (~0.46s/query). Distinct axon port 8094.
//   pm2 start ecosystem.pes03.config.js
module.exports = { apps: [{
  name: "poker44_bump_miner_pes03",
  script: "neurons/miner.py",
  interpreter: __dirname + "/.venv/bin/python",
  cwd: __dirname,
  args: "--netuid 126 --wallet.name pes --wallet.hotkey pes03 " +
        "--subtensor.network finney --axon.port 8094 " +
        "--blacklist.force_validator_permit --logging.info",
  env: {
    POKER44_BUMP_MODEL: __dirname + "/models/bump_model_v6.joblib",
    BT_NO_PARSE_CLI_ARGS: "0",
    POKER44_TOPK_FRAC: "0.15",
  },
  autorestart: true, max_restarts: 50, restart_delay: 5000,
}]};
