"use client";

/* Static paper figures are shipped as already-optimized public assets. */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";

const SITE_BASE = (import.meta as unknown as { env?: { BASE_URL?: string } }).env?.BASE_URL ?? "/";
const sitePath = (path: string) => `${SITE_BASE}${path.replace(/^\//, "")}`;

const trajectoryDemos = [
  {
    id: "onboarding",
    label: "Onboarding",
    title: "Coordinate three new-hire arrivals across six systems",
    deck: "Read the HR request, resolve two same-name managers, check availability, then commit the messages, event, and follow-up work.",
    status: "BENCHMARK RUN",
    surface: "Occamy benchmark replay",
    page: "demo/index.html",
    tone: "verified",
    tools: ["Gmail", "Knowledge", "Inventory", "Contacts", "Calendar", "Tasks"],
    receipts: [
      ["People", "3 new hires", "Engineering, Marketing, and Data."],
      ["Messages", "2 sent · 1 draft", "The missing Data manager triggered the draft path."],
      ["Calendar", "1 training event", "All three hires were free from 10:00–12:00."],
      ["Follow-up", "3 owned tasks", "Equipment and security risks became explicit work."],
    ],
  },
  {
    id: "recruiting",
    label: "Recruiting + Gmail",
    title: "Reconcile candidate records and verify one Gmail handoff",
    deck: "Preserve five source records, build three audit outputs, recover from two local labeling errors, then send exactly once and verify that it succeeded.",
    status: "REAL ACCIO WORK RUN",
    surface: "Accio Work",
    page: "demo/index.html",
    tone: "verified",
    tools: ["Files", "Gmail"],
    receipts: [
      ["Data contract", "5 records preserved", "Two duplicate groups were isolated without merging rows."],
      ["Recovery", "2 labels corrected", "The final files replace the first local draft."],
      ["Gmail", "1 send · 0 retries", "The exact subject was absent before sending and unique afterwards."],
      ["Final state", "5 artifacts reopened", "JSON, CSV, Markdown, and the Gmail receipt agree."],
    ],
  },
  {
    id: "restock",
    label: "Restock analysis",
    title: "Trace three stockouts through jobs, integrations, and inventory",
    deck: "Recover from empty filtered queries, then join scheduler failures, supplier configuration, and live stock into three explicit repair paths.",
    status: "BENCHMARK RUN",
    surface: "Occamy benchmark replay",
    page: "demo/index.html",
    tone: "verified",
    tools: ["Scheduler", "Config", "Inventory"],
    receipts: [
      ["Failed jobs", "3 recovered", "The initial filtered lookup was empty; the broader query found them."],
      ["Root causes", "3 integrations", "Timeout, disabled service, and expired credentials."],
      ["Stock impact", "3 products", "Each affected item was below its safety threshold."],
      ["Repair plan", "3 ordered actions", "Restore access first, then replenish the highest-risk stock."],
    ],
  },
];

const reefGamePrompt = `Build an original, polished single-file browser game titled "Coral Dragon Reef Rescue".

Deliverables:
- index.html: fully self-contained HTML/CSS/JavaScript with no external assets, libraries, network calls, or build step.
- README.md: controls, objective, win/loss rules, architecture, and exact local launch instructions.

Create a genuinely playable 3–5 minute game, not a particle showcase, static scene, or visual demo shell. The player controls a luminous coral dragon in a responsive 16:9 underwater reef, rescues exactly 8 glowing reef eggs, heals exactly 5 damaged coral polyps, and avoids moving purple wardens and environmental hazards.

Required game loop and progression:
1. Exactly 8 distinct collectible eggs must exist during a normal run. Every egg must be physically reachable by the player. Progressive spawning is allowed, but collection must remove/deactivate the collected object and the spawn loop must continue until the real counter can reach 8/8. Never let retained collected objects, an array-length cap, unreachable coordinates, overlays, terrain, or canvas bounds block later eggs.
2. Exactly 5 healable polyps must be reachable and visibly change from damaged to healed. Healing must require deliberate player interaction or sustained proximity, not happen automatically at game start.
3. Pace the run across 3–5 minutes with a clear opening, escalating middle, and achievable finish. Increase challenge gradually through warden movement, hazards, or spawn rhythm without creating unavoidable damage or impossible objectives.
4. Win only when Eggs is exactly 8/8 AND Polyps is exactly 5/5. It must not win at 4/8, 7/8, or with any unhealed polyp. Lose only when lives/HP reaches zero.

HUD and feedback contract:
5. The HUD must remain readable throughout play and continuously show: Eggs N/8, Polyps N/5, Lives: N, a large visible three-segment vitality/HP bar, score or progress, and an always-available Restart control.
6. Start with exactly 3 lives and 3 lit vitality segments. A real collision must immediately change both the numeric lives and bar from 3/3 to 2/3, extinguish exactly one segment, briefly flash/shake the player, apply short invulnerability, and provide readable sound/visual feedback. Additional valid hits must remain synchronized; no negative lives.
7. Include clear collection, healing, collision, near-completion, win, and loss feedback using lightweight procedural animation and Web Audio where supported. Audio must be optional and initialized only after user interaction.
8. Use strong visual hierarchy, readable text, coherent underwater art direction, animated coral/caustics/bubbles, polished dragon/warden silhouettes, and smooth lightweight effects. Gameplay objects must remain distinguishable from decoration.

Controls, states, and compatibility:
9. A visible start screen must explain the objective and show keyboard controls: Arrow Keys and WASD. Add usable pointer/touch controls for mobile. The first click on "Start Rescue" must enter a continuously rendering playable game with no black frame or console exception.
10. Pause/resume on visibility loss or an explicit pause control without corrupting timers. Clamp motion and spawns to reachable play bounds after responsive resize.
11. The loss overlay must show the exact final Eggs and Polyps counters and use the unambiguous action label "Try Again". The win overlay must summarize Eggs 8/8 and Polyps 5/5 and use "Play Again".
12. Try Again, Play Again, and the HUD Restart control must all call the same complete reset path. Reset counters, 3 lives/3 segments, player position/velocity, eggs, polyps, wardens, hazards, timers, particles, audio state, overlays, score, animation timestamps, and win/loss flags. No stale entities, duplicate loops, or accumulated event listeners may survive.

Implementation quality:
13. Use semantic HTML and a responsive canvas or DOM/canvas hybrid. Keep the game self-contained and performant on desktop and mobile. Avoid copyrighted characters, external fonts, images, audio, CDNs, imports, and hidden test/debug controls.
14. Organize JavaScript into clear state, update, render, collision, spawning, input, audio, and reset sections. Use delta-time clamping and deterministic bounds. Include comments for the egg spawn invariant, synchronized HP update, and unified reset path.

Before finishing, actually inspect and validate the implementation:
- JavaScript parses without syntax errors.
- Start, keyboard, pointer/touch, pause, and all restart actions alter real game state.
- A real collision changes 3 lives/3 lit segments to 2 lives/2 lit segments.
- Restart restores exactly 3 lives/3 lit segments and a fresh set/progression of 8 reachable eggs and 5 polyps.
- Exercise the real spawn/collection logic until Eggs reaches 8/8; do not merely inspect constants.
- Confirm the game cannot win at Eggs 4/8 + Polyps 5/5 or Eggs 8/8 + Polyps 4/5.
- Confirm both win and loss overlays show exact counters and required labels.
- Serve locally and confirm HTTP 200.

Use the available file and shell tools to create index.html and README.md and run validation. Return complete runnable code through files, not a prose mockup.`;

const auditGates = [
  ["01", "Canonicalize", "Schema drift", "Normalized task–environment package"],
  ["02", "Feasibility", "Unreachable or contradictory contract", "Semantic-alignment receipt"],
  ["03", "Discoverability", "Hidden required proof", "Reachability log"],
  ["04", "Reference execution", "Broken gold path", "Successful replay receipt"],
  ["05", "Negative execution", "Accidental grader credit", "Near-miss failure cases"],
  ["06", "Admit or quarantine", "Contamination, duplicates, missing lineage", "Provenance manifest"],
];

const modelComparisonModels = [
  "Occamy-1.0",
  "Qwen3.6-35B-A3B",
  "Agents-A1",
  "Nex-N2-mini",
  "BigBang-1.0",
  "Ornith-1.5",
  "GPT-5.6 Sol",
  "Qwen3.8-Max",
  "DeepSeek V4 Pro (0813)",
  "GLM-5.2",
];

const modelComparisonGroups = [
  {
    label: "Co-work",
    tone: "cowork",
    rows: [
      ["Claw-Eval (avg.)", "82.20", "69.50", "69.90", "66.60", "63.50", "64.40", "81.80", "83.90", "81.70", "81.60"],
      ["Claw-Eval (pass@3)", "71.40", "54.80", "41.70", "37.00", "40.20", "48.70", "68.90", "73.70", "74.50", "68.30"],
      ["WildClawBench", "49.16", "40.4", "30.73", "30.31", "32.87", "45.91", "67.20", "54.42", "37.30", "52.14"],
      ["CommerceAgentBench", "37.40", "19.60", "9.30", "16.80", "30.80", "37.40", "49.50", "46.30", "43.30", "39.30"],
      ["Business Arena", "$79,868", "$44,751", "$33,626", "$13,325", "$56,477", "$66,292", "$168,867", "$89,423", "$40,804", "$55,742"],
      ["GDPval", "1128", "1004", "869", "999", "951", "855", "1741", "1640", "1500", "1452"],
      ["OfficeQA Pro", "48.1", "39.1", "23.3", "46.6", "43.6", "59.4", "74.4", "69.2", "51.2", "66.2"],
      ["τ³-Bench (Banking)", "37.1", "11.9", "7.2", "25.8", "10.3", "21.7", "46.9", "54.6", "44.3", "37.1"],
    ],
  },
  {
    label: "Tool calling",
    tone: "tools",
    rows: [
      ["Automation (Pass@1)", "27.6", "7.5", "2.2", "5.7", "14.8", "18.5", "45.5", "43.5", "32.0", "28.0"],
      ["Automation (Partial)", "69.1", "39.4", "14.7", "27.9", "47.4", "58.0", "81.2", "81.2", "59.7", "70.0"],
      ["BFCL v4", "65.40", "63.19", "57.23", "62.81", "57.86", "68.51", "64.33", "73.65", "67.10", "70.33"],
      ["VitaBench", "41.75", "34.25", "37.00", "26.25", "46.00", "40.25", "46.75", "52.25", "53.50", "43.75"],
    ],
  },
  {
    label: "Coding",
    tone: "coding",
    rows: [
      ["Terminal-Bench 2.1", "59.0", "49.5", "41.6", "60.7*", "33.7", "67.8*", "88.8", "81.3*", "87.9*", "82.7"],
    ],
  },
  {
    label: "Instruction following",
    tone: "instruction",
    rows: [
      ["IFEval", "91.53", "86.90", "91.60", "91.60", "90.50", "81.80", "95.00", "95.02", "93.74", "93.89"],
    ],
  },
];

const sftRows = [
  ["General agentic", "5,418", "36.1%", "37.7K", "204.1M"],
  ["Long-horizon interactive agents", "923", "6.2%", "95.8K", "88.4M"],
  ["Terminal and software engineering", "1,228", "8.2%", "35.1K", "43.1M"],
  ["Tool-call grounding", "7,429", "49.5%", "9.1K", "67.7M"],
  ["Overall", "14,998", "100%", "26.9K", "403.3M"],
];

const zh: Record<string, string> = {
  "Results": "结果",
  "Co-work": "Co-work",
  "Method": "方法",
  "Cases": "案例",
  "Trajectory": "Trajectory",
  "Research": "研究",
  "Technical report": "技术报告",
  "A compact model for real-world co-work.": "面向真实 Co-work 任务的紧凑模型。",
  "A 35B-A3B model trained to complete executable tasks across tools, preserve state, recover, and verify the final result.": "Occamy-1.0 是一个 35B-A3B 模型：能跨工具把任务做完、记住当前状态、从错误中恢复，并在结束前检查结果。",
  "Watch a real trajectory": "查看真实 Trajectory",
  "View benchmark results": "查看评测结果",
  "Base": "Base model",
  "Replay": "Replay",
  "Source-faithful": "原始运行",
  "Objective": "目标",
  "Verified outcome": "已验证结果",
  "Task contract": "任务要求",
  "Clean five candidate records by normalized email. Preserve every source value. Send one Gmail notification, then verify it was sent successfully.": "按标准化邮箱清理五条候选人记录，保留所有源字段；发送一次 Gmail 通知，并验证发送成功。",
  "Real tool trajectory": "真实工具调用过程",
  "Five decisive checkpoints": "五个关键检查点",
  "Replay trajectory animation": "播放 Trajectory Replay",
  "Replaying": "Replay 中",
  "Final state independently verified": "最终状态已独立验证",
  "Exactly one Gmail side effect": "Gmail 只发送了一次",
  "27 events · 7 artifacts · verified Gmail send": "27 个事件 · 7 个产物 · Gmail 发送成功已验证",
  "Sanitized replay of a real Occamy run through Accio Work.": "这是一条来自 Accio Work 的真实 Occamy 运行记录，展示前已做匿名处理。",
  "Pass with recovery; independently validated after the run.": "模型中途发现并修正了错误；最终结果已在运行结束后独立验证。",
  "Evaluation snapshot": "评测概览",
  "Higher task success.": "更高的任务成功率。",
  "Less work per result.": "更少的执行开销。",
  "Combined ClawEval T/C": "ClawEval T/C 合并结果",
  "161 T + 38 C tasks · same harness": "161 个 T 任务 + 38 个 C 任务 · 相同 harness",
  "Supporting diagnostics explain individual skills; they do not replace end-to-end co-work outcomes.": "单项评测用于能力诊断，不替代端到端 Co-work 结果。",
  "Metric": "指标",
  "Change": "变化",
  "Scope is deliberately narrow: this table reports the frozen combined ClawEval T/C comparison, not an aggregate across every benchmark.": "这张表只对比 ClawEval T/C，不把其他 benchmark 混成一个总分。完整结果见上方论文对齐表。",
  "Reported co-work snapshot": "主要 Co-work 结果",
  "Evaluation coverage": "评测覆盖",
  "The benchmark map reproduces the report's evaluation scope. A coverage label does not imply that a frozen leaderboard value is available in every table.": "这里列出论文覆盖的全部评测；有些 benchmark 只用于能力诊断，不一定都有可直接对比的最终分数。",
  "Co-work + office": "Co-work + Office",
  "Coding + terminal": "Coding + Terminal",
  "Tool use + automation": "Tool use + Automation",
  "Instruction following": "指令遵循",
  "Benchmark": "基准",
  "Occamy result": "Occamy 结果",
  "Supporting capability transfer": "其他能力对比",
  "Starting checkpoint": "Base model",
  "Gain": "提升",
  "From experts to one deployable model": "从多个 Expert 合成一个可部署模型",
  "Result source": "结果来源",
  "This page follows the active expert-merging table as the frozen result source. WildClawBench is reported as 50.85; surrounding narrative copy is not used to override the table.": "网站数值以论文最新的 Expert merging 表为准。WildClawBench 使用表中的 50.85，不采用尚未同步的正文数字。",
  "Model": "模型",
  "Long-horizon Expert": "Long-horizon Expert",
  "General Expert": "General Expert",
  "Model Soup": "Model Soup",
  "Co-work is an": "Co-work 定义为",
  "executable contract.": "可执行任务契约。",
  "A task is complete only when the requested state exists and can be checked. Fluency alone is not the outcome.": "只有结果真正落地、而且能够验证，任务才算完成。说得漂亮不等于做完。",
  "Layer": "层级",
  "What it controls": "看什么",
  "Observable checks": "如何验证",
  "Evaluation role": "在评测中的作用",
  "Execution primitives": "基础执行能力",
  "Tool use, search, coding, files": "工具、搜索、编码与文件操作",
  "Valid calls and grounded results": "调用有效，结果有据可查",
  "Diagnostic": "单项诊断",
  "Coordination": "规划与协调",
  "Planning, state, recovery, verification": "规划步骤、跟踪状态、出错恢复、核对结果",
  "Checkpoints and readbacks": "关键检查点和结果回读",
  "End-to-end co-work": "端到端 Co-work",
  "The full task contract": "完整任务是否做完",
  "Final state and verifier receipt": "最终状态和 verifier 记录",
  "Primary outcome": "最终指标",
  "Contract": "任务定义",
  "Request + initial world + tools + constraints + grader.": "用户请求、初始环境、可用工具、约束和 grader。",
  "Episode": "Episode",
  "One complete attempt, even across history rewrites.": "一次从开始到结束的完整尝试；中途 rewrite 也仍属于同一个 episode。",
  "Tokens, tool I/O, state changes, and verification.": "模型输出、工具 I/O、状态变化和验证记录共同组成一条 Trajectory。",
  "Continuity": "连续性",
  "History rewrites split": "History rewrite 划分 segment，",
  "segments—not episodes.": "但不终止 episode。",
  "A rewrite changes the model’s conditioning history. It does not reset task ownership, reward, or evaluation.": "Rewrite 只改变模型当前看到的上下文；任务仍属于同一个 episode，reward 和 evaluation 也不会重置。",
  "One episode": "同一个 episode",
  "One reward · One evaluation": "一个 reward · 一次 evaluation",
  "Loss": "Loss",
  "Each sampled token, once": "每个采样 token 只计算一次",
  "Harness-written rewrite": "Harness 写入的 rewrite",
  "Conditioning only": "只改变模型看到的上下文",
  "Reward + evaluation": "Reward + evaluation",
  "Full episode ownership": "仍按完整 episode 计算",
  "Data factory": "Data factory",
  "Build the world.": "可执行环境构造，",
  "Then admit the task.": "数据准入判定。",
  "Every task ships with an environment, tools, a reference execution, negative cases, a grader, and provenance.": "每条任务数据都带有可运行环境、工具、参考执行、负例、grader 和来源记录。",
  "Execution-grounded task construction and admission pipeline. Adapted from the technical report.": "从构造任务到通过检查、进入训练集的完整流程。",
  "Admission pipeline": "数据检查流程",
  "Six gates reject rows that cannot be replayed or trusted.": "六项准入检查淘汰不可 Replay、不可验证或来源不明的数据。",
  "Gate": "检查项",
  "Rejects": "拒绝原因",
  "Retained records": "留下什么记录",
  "Two complementary routes": "两条互补路线",
  "Start from the world—or from the capability gap.": "Environment-first 与 Capability-first 双路径合成。",
  "Environment-first": "Environment-first",
  "begins with a real tool surface and asks what difficult, verifiable work it makes possible.": "先选真实工具和数据，再设计一项困难但结果可验证的任务。",
  "Capability-first": "Capability-first",
  "begins with a missing behavior and composes the environment required to test it.": "先确定模型缺少哪种能力，再搭出能够准确测试它的环境。",
  "Infrastructure": "基础设施",
  "Replay every layer": "跨层状态 Replay，",
  "that matters.": "支持执行复现与诊断。",
  "The harness records policy, conversation, environment, and task state so a rollout can be inspected and reproduced.": "Harness 会同时记录模型输出、对话、环境和任务状态，让每次 rollout 都能检查、复现和定位问题。",
  "Training infrastructure for long-horizon co-work, aligned with the technical report.": "用于长程 Co-work 训练的可回放基础设施。",
  "Policy": "模型输出",
  "Sampled tokens, masks, log probabilities, and segment lineage.": "采样 token、mask、log probability 与 segment lineage。",
  "Conversation": "对话",
  "Messages, tool-call arguments, tool results, and history rewrites.": "消息、工具参数、工具结果与历史重写。",
  "Environment": "环境",
  "Files, services, subprocesses, external state, and side effects.": "文件、服务、子进程、外部状态与副作用。",
  "Task": "任务状态",
  "Provisioning, finalization, sealed grader inputs, and reward records.": "环境初始化、最终状态、封存的 grader 输入和 reward 记录。",
  "Case studies": "案例研究",
  "Small decisions become": "局部决策误差，",
  "task-level gaps.": "导致任务级性能差异。",
  "Three controlled Accio Work runs expose where coordination, artifact quality, and safety ordering matter beyond tool-call syntax.": "三个 Accio Work 实例说明：会调用工具还不够，步骤安排、产物质量和安全顺序同样会影响最终结果。",
  "Pass condition": "通过条件",
  "Same task": "相同任务",
  "Same Accio Work harness": "相同 Accio Work harness",
  "Observed endpoint traces": "真实端点记录",
  "Observed Accio Work tool trajectory": "真实 Accio Work Trajectory",
  "Qualitative comparison from one run per endpoint. These cases illustrate mechanisms; they are not aggregate benchmark estimates.": "每个模型端点展示一次真实运行，用来说明行为差异；这些案例不是整体 benchmark 分数。",
  "Trajectory studio": "Trajectory Replay",
  "Follow the work": "短、中、长任务的",
  "at three horizons.": "Trajectory 对比。",
  "Switch among three real Accio Work runs: a short research task, a verified medium episode, and a longer diagnostic workflow. Every view separates the observable tool path, persisted artifacts, and its verification boundary.": "这里有三条真实 Accio Work 运行：短任务、中等长度的已验证任务，以及较长的诊断流程。每条都分开展示工具调用、保存下来的文件和最终验证范围。",
  "Open full replay": "打开完整回放",
  "Validation scope": "能验证到哪里",
  "Learning recipe": "训练流程",
  "Train one deployable": "面向部署的",
  "co-work model.": "Co-work 模型训练。",
  "The latest report trains a long-horizon expert with SFT + HDPO, a general expert with SFT, merges them, then applies SAO to the unified checkpoint.": "我们先用 SFT + HDPO 训练 Long-horizon Expert，用 SFT 训练 General Expert；随后通过 Model Soup 合并两者，再在统一 checkpoint 上做 SAO。",
  "Stage": "阶段",
  "Training signal": "训练信号",
  "What is preserved": "主要保留什么",
  "Invariant": "不变量",
  "Long-horizon expert · SFT + HDPO": "Long-horizon Expert · SFT + HDPO",
  "Stable long episodes + episode outcomes": "稳定的长 episode + episode 级结果",
  "Continuity, recovery, and verification": "连续性、恢复与验证",
  "General expert · SFT": "General Expert · SFT",
  "Broad coding, search, and tool trajectories": "覆盖 Coding、Search 和 Tool use 的 Trajectory",
  "Supporting agentic capability": "支持性智能体能力",
  "Uniform model soup": "Uniform Model Soup",
  "Complementary expert checkpoints": "互补专家检查点",
  "One checkpoint; no inference ensemble": "最终只有一个 checkpoint；推理时不需要 ensemble",
  "SAO reinforcement learning": "SAO RL",
  "Verified episode outcomes": "已验证的 episode 结果",
  "Segment lineage across history rewrites": "跨历史重写的 segment lineage",
  "SFT corpus composition": "SFT 语料构成",
  "Data source": "数据来源",
  "Samples": "样本数",
  "Share": "占比",
  "Avg. length": "平均长度",
  "Tokens": "Token 数",
  "General agentic": "通用智能体",
  "Long-horizon interactive agents": "长程交互智能体",
  "Terminal and software engineering": "终端与软件工程",
  "Tool-call grounding": "工具调用对齐",
  "Overall": "总计",
  "Reward and critic explained variance during RL training.": "RL 训练中的奖励与 critic explained variance。",
  "Audit implications": "检查结果时要注意",
  "Confirm endpoint identity before comparison.": "比较前确认端点身份。",
  "Keep environment variation explicit.": "显式记录环境变化。",
  "Measure verifier coverage and side effects—not trajectory length alone.": "除了 Trajectory 长度，还要检查 verifier 覆盖了什么、工具造成了哪些真实改动。",
  "Public surfaces": "公开入口",
  "Use the model.": "模型发布。",
  "Inspect the work.": "运行证据公开。",
  "Open the product surface, model release, and public code organization.": "前往 Accio、模型页面和公开代码仓库。",
  "Open the co-work product": "打开 Accio",
  "All three are real Accio Work trajectories. The Gmail episode is independently validated; the GitHub export has a partial receipt; the long release run remains diagnostic because its intended Hugging Face connector was unavailable.": "三条都是来自 Accio Work 的真实 Trajectory。Gmail 任务已独立验证；GitHub 任务只拿到了部分 receipt；长任务因为 Hugging Face connector 当时不可用，只作为诊断案例展示。",
  "A compact model for verified co-work.": "一个能完成、也会验证真实 Co-work 任务的小模型。",
  "Read task contract + source records": "读取任务要求和原始记录",
  "Write candidate audit artifacts": "写入候选人审计产物",
  "Require zero matches before send": "发送前确认零匹配",
  "Send exactly once": "只发送一次",
  "Search and reopen the sent message twice": "检索并两次回读已发送邮件",
  "Project-state reconciliation": "核对项目状态",
  "Twelve-document PDF digest": "十二份 PDF 摘要整理",
  "Incident recovery": "事故恢复",
  "Reconcile the records, not the filenames.": "按记录核对状态，不能只看文件名。",
  "Organize a corpus without erasing its identity.": "整理文档，同时保留每份材料的来源和含义。",
  "The right actions, in the safe order.": "正确动作，也要遵守安全顺序。",
  "Short · GitHub identity": "短 · GitHub 身份确认",
  "Medium · Files + Gmail": "中 · 文件 + Gmail",
  "Long · Release readiness": "长 · 发布就绪审计",
  "Strict Pass@1": "严格 Pass@1",
  "Strict Pass@3": "严格 Pass@3",
  "Tokens / trajectory": "每条 Trajectory 的 Token 数",
  "Tool calls / trajectory": "每条 Trajectory 的工具调用数",
  "Trial wall time": "单次运行耗时",
  "Timeout rate": "超时率",
  "ClawEval average": "ClawEval 平均分",
  "ClawEval Pass@3": "ClawEval Pass@3",
  "Open-ended, long-horizon workflows": "开放式长程工作流",
  "Final checkpoint table": "最终检查点表",
  "3rd overall; $80K starting principal": "总体第 3；起始本金 $80K",
  "Search-intensive long-document QA": "搜索密集的长文档问答",
  "3rd overall in the reported comparison": "论文对比中总体第 3",
  "1st overall; GPT-5.6 Sol 81.8": "总体第 1；GPT-5.6 Sol 为 81.8",
  "Above GPT-5.6 Sol 68.9": "高于 GPT-5.6 Sol 的 68.9",
  "AutomationBench · strict": "AutomationBench · 严格通过率",
  "AutomationBench · average score": "AutomationBench · 平均分数",
  "Canonicalize": "统一格式",
  "Schema drift": "Schema 漂移",
  "Normalized task–environment package": "格式统一的任务与环境包",
  "Feasibility": "可行性",
  "Unreachable or contradictory contract": "任务无法完成，或要求互相矛盾",
  "Semantic-alignment receipt": "语义一致性检查记录",
  "Discoverability": "证据是否找得到",
  "Hidden required proof": "必要验证不可见",
  "Reachability log": "证据可达性记录",
  "Reference execution": "参考执行",
  "Broken gold path": "Gold 路径损坏",
  "Successful replay receipt": "Replay 成功记录",
  "Negative execution": "运行负例",
  "Accidental grader credit": "评分器意外给分",
  "Near-miss failure cases": "近似成功但应失败的样例",
  "Admit or quarantine": "进入训练集或隔离",
  "Contamination, duplicates, missing lineage": "污染、重复或 lineage 缺失",
  "Provenance manifest": "数据来源清单",
  "Inspect a workspace of status records, reconcile four workstreams, recover dependency chains, and write a brief whose claims can be traced back to source files.": "检查一组项目状态记录，核对四条工作流和它们的依赖关系，并写一份每个结论都能回到源文件的简报。",
  "Recovered 1 completed, 2 active, 1 blocked, and 4 overdue items.": "正确找出 1 项已完成、2 项进行中、1 项受阻和 4 项逾期工作。",
  "Preserved both verified dependency chains.": "保留两条已经验证的依赖链。",
  "Reopened the final artifact before reporting completion.": "汇报完成前，重新打开并检查最终文件。",
  "Counted only 3 overdue items, introduced an unsupported blocker, and stopped without readback.": "只统计到 3 个逾期事项，引入了无证据的 blocker，并在未回读产物时停止。",
  "Correct state + verified artifact": "状态正确 + 文件已验证",
  "VERIFIED": "已验证",
  "COUNT ERROR": "计数错误",
  "Read twelve PDFs, assign six source categories, extract a fixed caption set, and package the results with collision-safe, human-readable filenames.": "读取十二份 PDF，归入六类来源，抽取固定图注集合，并用可读且避免冲突的文件名打包结果。",
  "Processed all 12 of 12 documents across 6 categories.": "处理了 6 个类别中的全部 12 份文档。",
  "Derived stable names from document titles instead of opaque stems.": "从文档标题生成稳定文件名，而不是保留不透明 stem。",
  "Verified the packaged outputs after the final write.": "最终写入后验证打包结果。",
  "Covered the corpus, but retained opaque stems and numerical suffixes that made the artifact harder to audit and reuse.": "覆盖了全部语料，但保留不透明 stem 和数字后缀，使产物更难审计与复用。",
  "12/12 organized + reusable": "12/12 已整理 + 可复用",
  "FULL CONTRACT": "全部要求完成",
  "WEAK NAMING": "命名较弱",
  "Trace five incident records, recover the dependency chain 1501 → 1502 → 1503, and produce a migration plan that respects the legacy retirement gate.": "检查五条事故记录，还原依赖链 1501 → 1502 → 1503，并制定迁移计划；旧系统完成退役检查前不能进入下一步。",
  "Identified the correct root cause and full dependency chain.": "识别正确根因和完整依赖链。",
  "Kept validation and legacy retirement ahead of full synchronization.": "把验证和旧系统退役放在全量同步之前。",
  "Produced a plan whose ordering could be checked against the records.": "计划中的每一步顺序都能从记录中核对。",
  "Found the root cause, but advanced full sync while legacy v2 was still active—violating the migration safety gate.": "虽然找到了根因，却在旧版 v2 仍运行时就开始全量同步，顺序不安全。",
  "Root cause + safe recovery order": "根因 + 安全恢复顺序",
  "SAFE ORDER": "顺序安全",
  "ORDER MISMATCH": "顺序不符",
  "VERIFIED REAL RUN": "已验证真实运行",
  "REAL RUN · DIAGNOSTIC": "真实运行 · 诊断证据",
  "Identify one repository from incomplete technical clues": "根据不完整的技术线索找到正确仓库",
  "Clean candidate records and prove one safe Gmail send": "清理候选人记录，并证明一次安全 Gmail 发送",
  "Build a cross-app release-readiness brief": "跨应用检查一次发布是否准备就绪",
  "A compact Accio Work scenario: search, inspect the canonical repository, distinguish adjacent projects, and persist every identity claim in JSON and Markdown.": "一个短 Accio Work 任务：搜索并检查官方仓库，排除名称相近的项目，再把判断依据分别保存为 JSON 和 Markdown。",
  "A source-faithful Occamy-1.0 episode: preserve five records, recover two local labeling errors, send exactly once, and verify that it succeeded.": "一个中等长度的 Occamy-1.0 episode：保留五条原始记录，修正两处本地标签错误，只发一封邮件，并验证发送成功。",
  "A longer diagnostic flow across GitHub, Hugging Face, and local artifacts, ending in a structured risk register and mutually consistent Markdown deliverables.": "一个较长的诊断任务：跨 GitHub、Hugging Face 和本地文件收集证据，最后生成结构化风险清单和内容一致的 Markdown 交付物。",
  "Task shape": "任务形态",
  "READ-ONLY RESEARCH": "只读任务",
  "Repository search and metadata inspection create no external side effect.": "仓库搜索与元数据检查不会产生外部副作用。",
  "Decision path": "决策路径",
  "SEARCH → CROSS-CHECK": "搜索 → 交叉核验",
  "The leading match is compared with adjacent projects before selection.": "选定前会将首选匹配与相邻项目比较。",
  "Persisted output": "持久化产物",
  "JSON + MARKDOWN": "JSON + MARKDOWN",
  "Structured records and a readable brief are written as separate artifacts.": "结构化记录与可读简报分别写入独立产物。",
  "Verification status": "验证状态",
  "Final state": "最终状态",
  "PASS_WITH_RECOVERY": "恢复后通过",
  "Two local labels were corrected before completion.": "完成前修复了两处本地标签。",
  "Gmail side effect": "Gmail 实际操作",
  "EXACTLY_ONCE_PASS": "恰好一次通过",
  "One send, one matched message, and no send retry.": "一次发送、一个匹配邮件、没有发送重试。",
  "Observable trace": "可检查的 Trajectory",
  "27 events · 7 artifacts": "27 个事件 · 7 个产物",
  "Files, Gmail calls, corrections, and outputs remain inspectable.": "文件、Gmail 调用、修复和输出均可检查。",
  "Send verification": "发送验证",
  "Verified send": "发送成功已验证",
  "The Gmail notification was sent successfully.": "Gmail 通知已成功发送。",
  "Connector state": "Connector 状态",
  "HF UNAVAILABLE": "HF 不可用",
  "The captured take could not complete through the intended Hugging Face connector.": "该次运行未能通过预期 Hugging Face connector 完成。",
  "Recovery": "恢复",
  "LABELED PUBLIC FALLBACK": "已标注公开回退",
  "Public metadata was used only after the connector failure was made explicit.": "仅在明确标注 connector 失败后才使用公开元数据。",
  "JSON + 2 MARKDOWN": "JSON + 2 份 MARKDOWN",
  "Facts, risks, and launch checks are separated into inspectable artifacts.": "事实、风险与发布检查分别写入可检查产物。",
  "The flow demonstrates recovery and artifact construction, not a connector-pass.": "该流程展示恢复与产物构造，不代表 connector 通过。",
  "Final state was independently validated after the run; the replay does not imply that the agent itself reopened every verifier artifact.": "最终状态在运行后独立验证；该回放不暗示智能体亲自重新打开了每一项 verifier 产物。",
  "The available take used a labeled public Hugging Face fallback after the connector was unavailable. It is a useful diagnostic run, not a verified full-connector success.": "该次运行在 connector 不可用后使用了明确标注的 Hugging Face 公开回退；它是有用的诊断运行，不是已验证的完整 connector 成功。",
  "Files": "文件",
  "Hugging Face": "Hugging Face",
};

function ToolIcon({ name }: { name: string }) {
  const key = name.toLowerCase();
  if (key.includes("github")) {
    return <svg className="tool-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.2a8.8 8.8 0 0 0-2.8 17.15c.44.08.6-.19.6-.42v-1.7c-2.47.54-3-1.05-3-1.05-.4-1.03-.99-1.3-.99-1.3-.8-.55.06-.54.06-.54.9.06 1.37.92 1.37.92.79 1.36 2.07.97 2.58.74.08-.57.31-.97.56-1.2-1.97-.22-4.05-.98-4.05-4.39 0-.97.35-1.76.92-2.38-.09-.23-.4-1.13.09-2.35 0 0 .75-.24 2.42.91A8.4 8.4 0 0 1 12 7.3a8.4 8.4 0 0 1 2.2.3c1.68-1.15 2.43-.91 2.43-.91.49 1.22.18 2.12.09 2.35.57.62.92 1.41.92 2.38 0 3.41-2.08 4.16-4.06 4.38.32.28.6.82.6 1.66v2.47c0 .23.16.5.61.42A8.8 8.8 0 0 0 12 3.2Z" /></svg>;
  }
  if (key.includes("gmail")) {
    return <svg className="tool-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.2 6.5h15.6v11H4.2z" /><path d="m4.6 7 7.4 5.7L19.4 7" /></svg>;
  }
  if (key.includes("hugging")) {
    return <svg className="tool-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.2" /><path d="M8.8 10.1h.01M15.2 10.1h.01M9 14.1c1.7 1.5 4.3 1.5 6 0M5.4 14.2l-2 1.5M18.6 14.2l2 1.5" /></svg>;
  }
  if (key.includes("file") || key.includes("artifact")) {
    return <svg className="tool-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3.8 7.5h6l1.8 2h8.6v8.4a1.6 1.6 0 0 1-1.6 1.6H5.4a1.6 1.6 0 0 1-1.6-1.6Z" /><path d="M3.8 9.5V6.1a1.6 1.6 0 0 1 1.6-1.6h4.1l1.7 2h7.4" /></svg>;
  }
  if (key.includes("model") || key.includes("base")) {
    return <svg className="tool-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="5.2" y="5.2" width="13.6" height="13.6" rx="3" /><path d="M9 2.8v2.4M15 2.8v2.4M9 18.8v2.4M15 18.8v2.4M2.8 9h2.4M18.8 9h2.4M2.8 15h2.4M18.8 15h2.4" /></svg>;
  }
  if (key.includes("replay") || key.includes("source")) {
    return <svg className="tool-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.6 8.2A7.3 7.3 0 1 0 19 15" /><path d="M18.6 4.7v3.5h-3.5" /><path d="M12 8.5v4l2.8 1.7" /></svg>;
  }
  return <svg className="tool-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2Z" /></svg>;
}

type SiteView = "home" | "research";

export function OccamySite({ view = "home" }: { view?: SiteView }) {
  const [locale] = useState<"en" | "zh">("en");
  const [activeTrajectoryId, setActiveTrajectoryId] = useState("recruiting");
  const activeTrajectory = trajectoryDemos.find((trajectory) => trajectory.id === activeTrajectoryId) ?? trajectoryDemos[0];
  const tx = (value: string) => locale === "zh" ? (zh[value] ?? value) : value;

  useEffect(() => {
    const root = document.documentElement;
    const revealSelectors = [
      ".results-head", ".results-table-wrap", ".results-note",
      ".research-map", ".data-corpus-card",
      ".section-intro", ".capability-table-wrap", ".compact-glossary",
      ".continuity-copy", ".segment-visual", ".paper-figure",
      ".audit-heading", ".audit-table-wrap", ".synthesis-copy",
      ".infrastructure-head", ".replay-matrix", ".case-head",
      ".case-tabs", ".case-canvas", ".case-caveat",
      ".trajectory-section-head", ".trajectory-tabs", ".trajectory-context",
      ".trajectory-receipt-grid", ".interactive-replay-shell", ".trajectory-evidence-note",
      ".efficiency-frontier", ".game-demo-head", ".game-demo-stage", ".game-demo-notes",
      ".training-table-wrap", ".training-evidence-single", ".audit-implications", ".release-copy",
      ".resource-links", ".honesty-note",
    ];
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(revealSelectors.join(",")));
    root.classList.add("js-motion");
    nodes.forEach((node) => node.classList.add("scroll-reveal"));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -7% 0px" });
    nodes.forEach((node) => observer.observe(node));

    let frame = 0;
    let pointerFrame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let scrollMix = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyPalette = () => {
      const effectiveX = reducedMotion.matches ? 0 : pointerX;
      const effectiveScroll = reducedMotion.matches ? 0 : scrollMix;
      const east = (effectiveX + 1) / 2;
      const center = 1 - Math.abs(effectiveX);
      root.style.setProperty("--hero-mint-alpha", String(0.14 + (1 - east) * 0.14 - effectiveScroll * 0.03));
      root.style.setProperty("--hero-sky-alpha", String(0.12 + east * 0.15 + effectiveScroll * 0.05));
      root.style.setProperty("--hero-aqua-alpha", String(0.12 + center * 0.1));
      root.style.setProperty("--header-mint-alpha", String(0.045 + (1 - east) * 0.07));
      root.style.setProperty("--header-sky-alpha", String(0.04 + east * 0.07 + effectiveScroll * 0.02));
      root.style.setProperty("--section-mint-alpha", String(0.06 + (1 - east) * 0.06));
      root.style.setProperty("--section-sky-alpha", String(0.055 + east * 0.06 + effectiveScroll * 0.025));
    };
    const updateProgress = () => {
      frame = 0;
      const distance = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const scrollPhase = window.scrollY / 560;
      scrollMix = reducedMotion.matches ? 0.5 : (Math.sin(scrollPhase * 0.86) + 1) / 2;
      root.style.setProperty("--page-progress", String(Math.min(1, Math.max(0, window.scrollY / distance))));
      root.style.setProperty("--ambient-scroll", `${reducedMotion.matches ? 0 : Math.sin(scrollPhase) * 48}px`);
      root.style.setProperty("--ambient-scroll-soft", `${reducedMotion.matches ? 0 : Math.cos(scrollPhase * 0.74) * 28}px`);
      root.style.setProperty("--ambient-scroll-x", `${reducedMotion.matches ? 0 : Math.sin(scrollPhase * 0.61) * 42}px`);
      applyPalette();
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };
    const updatePointer = () => {
      pointerFrame = 0;
      root.style.setProperty("--cursor-x", `${pointerX * 22}px`);
      root.style.setProperty("--cursor-y", `${pointerY * 16}px`);
      root.style.setProperty("--cursor-x-soft", `${pointerX * 9}px`);
      root.style.setProperty("--cursor-y-soft", `${pointerY * 7}px`);
      root.style.setProperty("--cursor-x-back", `${pointerX * -12}px`);
      root.style.setProperty("--cursor-y-back", `${pointerY * -7}px`);
      applyPalette();
    };
    const onPointerMove = (event: PointerEvent) => {
      if (reducedMotion.matches || event.pointerType === "touch") return;
      pointerX = (event.clientX / Math.max(1, window.innerWidth) - 0.5) * 2;
      pointerY = (event.clientY / Math.max(1, window.innerHeight) - 0.5) * 2;
      if (!pointerFrame) pointerFrame = window.requestAnimationFrame(updatePointer);
    };
    const resetPointer = () => {
      pointerX = 0;
      pointerY = 0;
      if (!pointerFrame) pointerFrame = window.requestAnimationFrame(updatePointer);
    };
    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("blur", resetPointer);
    document.documentElement.addEventListener("mouseleave", resetPointer);

    return () => {
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("blur", resetPointer);
      document.documentElement.removeEventListener("mouseleave", resetPointer);
      nodes.forEach((node) => node.classList.remove("scroll-reveal", "is-visible"));
      root.classList.remove("js-motion");
      root.style.removeProperty("--page-progress");
      root.style.removeProperty("--ambient-scroll");
      root.style.removeProperty("--ambient-scroll-soft");
      root.style.removeProperty("--ambient-scroll-x");
      root.style.removeProperty("--cursor-x");
      root.style.removeProperty("--cursor-y");
      root.style.removeProperty("--cursor-x-soft");
      root.style.removeProperty("--cursor-y-soft");
      root.style.removeProperty("--cursor-x-back");
      root.style.removeProperty("--cursor-y-back");
      root.style.removeProperty("--hero-mint-alpha");
      root.style.removeProperty("--hero-sky-alpha");
      root.style.removeProperty("--hero-aqua-alpha");
      root.style.removeProperty("--header-mint-alpha");
      root.style.removeProperty("--header-sky-alpha");
      root.style.removeProperty("--section-mint-alpha");
      root.style.removeProperty("--section-sky-alpha");
    };
  }, []);

  return (
    <main className={`site-view ${view}-view`}>
      <div className="scroll-progress" aria-hidden="true"><i /></div>
      <section className="research-page-intro" id="method-top">
        <div>
          <p className="eyebrow"><span className="eyebrow-dot" />{locale === "zh" ? "方法 · 数据 / 训练 / 基础设施" : "METHOD · DATA / TRAINING / INFRASTRUCTURE"}</p>
          <h1>{locale === "zh" ? "从可执行任务，" : "From executable tasks"}<br /><em>{locale === "zh" ? "到一个可部署模型。" : "to one deployable model."}</em></h1>
        </div>
        <div className="research-page-deck">
          <p>{locale === "zh" ? "这一页集中说明 Occamy-1.0 如何构造并审计数据、连接分阶段训练，以及用可回放系统保存长程任务的完整状态。" : "This page connects audited task construction, staged optimization, and the replayable system that preserves complete long-horizon task state."}</p>
          <nav aria-label={locale === "zh" ? "方法页导航" : "Method page navigation"}>
            <a href="#data"><span>01</span>{locale === "zh" ? "数据" : "Data"}</a>
            <a href="#training"><span>02</span>{locale === "zh" ? "训练" : "Training"}</a>
            <a href="#infra"><span>03</span>{locale === "zh" ? "基础设施" : "Infrastructure"}</a>
          </nav>
        </div>
      </section>

      <section className="hero" id="home-top">
        <div className="hero-orb hero-orb-one" aria-hidden="true" />
        <div className="hero-orb hero-orb-two" aria-hidden="true" />

        <div className="hero-copy">
          <div className="hero-accio-logo"><img src={sitePath("brand/accio.svg")} alt="Accio" /></div>
          <h1><span className="hero-occamy-wordmark"><img src={sitePath("brand/occamy.png")} alt="O" /><span>ccamy-1.0</span></span></h1>
          <p className="hero-subtitle">Open Pareto-frontier 35B Intelligence for Co-work</p>
          <p className="hero-deck">A cost-efficient co-work model, further trained from Qwen3.6-35B-A3B to gather information, use tools, write code, and manage files across long workflows.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#trajectory">
              Watch trajectories <span className="button-arrow" aria-hidden="true">→</span>
            </a>
            <a className="button button-secondary" href="#results">View benchmark results</a>
          </div>
          <div className="hero-facts" aria-label="Model and research links">
            <a className="hero-resource-link" href={sitePath("report/occamy1.0.pdf")} target="_blank" rel="noreferrer" aria-label="Read the technical report PDF">
              <span className="resource-mark">PDF</span>
              <span className="fact-copy"><span className="fact-label">Technical report</span><strong>Read report</strong></span>
              <span className="resource-arrow" aria-hidden="true">↗</span>
            </a>
            <a className="hero-resource-link" href="https://huggingface.co/Accio-Lab/Occamy-1.0" target="_blank" rel="noreferrer">
              <ToolIcon name="Hugging Face" />
              <span className="fact-copy"><span className="fact-label">Model</span><strong>Hugging Face</strong></span>
              <span className="resource-arrow" aria-hidden="true">↗</span>
            </a>
            <a className="hero-resource-link" href="https://github.com/Accio-Lab/occamy" target="_blank" rel="noreferrer">
              <ToolIcon name="GitHub" />
              <span className="fact-copy"><span className="fact-label">Code</span><strong>GitHub</strong></span>
              <span className="resource-arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className="paper-overview-section" aria-labelledby="paper-overview-title">
        <div className="paper-overview-copy">
          <p className="section-index">{locale === "zh" ? "技术报告框架" : "Technical report overview"}</p>
          <h2 id="paper-overview-title">{locale === "zh" ? "真实任务数据驱动的可部署 Co-work 模型。" : "From real work to one deployable co-work model."}</h2>
          <p>{locale === "zh"
            ? "整个流程从真实工作场景出发：用两条路线构造数据，经过 Replay 和质量检查后进入分阶段训练，最终合成 Occamy-1.0。"
            : "The latest report joins real-world work, dual-route synthesis, verified admission, replayable infrastructure, and staged training in one loop."}</p>
        </div>
        <figure className="paper-figure overview-figure">
          <img src={sitePath("assets/paper-overview.png")} alt="Occamy-1.0 technical report overview" loading="lazy" decoding="async" />
        </figure>
      </section>

      <nav className="research-map" aria-label={locale === "zh" ? "研究内容导航" : "Research area navigation"}>
        <div className="research-map-intro">
          <span>{locale === "zh" ? "研究结构" : "Research structure"}</span>
          <strong>{locale === "zh" ? "四个问题的解答" : "Four tracks, four different questions."}</strong>
        </div>
        <a className="research-track track-eval" href="#results">
          <span>01</span><strong>{locale === "zh" ? "评测结果" : "Eval results"}</strong>
          <p>{locale === "zh" ? "端到端 Co-work 能力" : "What did the model actually complete?"}</p><i>↘</i>
        </a>
        <a className="research-track track-data" href={sitePath("research#data")}>
          <span>02</span><strong>{locale === "zh" ? "数据" : "Data"}</strong>
          <p>{locale === "zh" ? "任务构造、审计与数据准入" : "How are tasks built, audited, and admitted?"}</p><i>↘</i>
        </a>
        <a className="research-track track-training" href={sitePath("research#training")}>
          <span>03</span><strong>{locale === "zh" ? "训练" : "Training"}</strong>
          <p>{locale === "zh" ? "SFT、Expert、Model Soup 与 SAO 的训练流程" : "How do SFT, experts, model soup, and SAO connect?"}</p><i>↘</i>
        </a>
        <a className="research-track track-infra" href={sitePath("research#infra")}>
          <span>04</span><strong>{locale === "zh" ? "基础设施" : "Infrastructure"}</strong>
          <p>{locale === "zh" ? "长程运行记录、Replay 与验证" : "How are long runs recorded, replayed, and verified?"}</p><i>↘</i>
        </a>
      </nav>

      <section className="results-section" id="results">
        <figure className="paper-main-results" aria-labelledby="paper-main-results-title">
          <div className="paper-main-results-head">
            <span>REPORT MAIN RESULTS</span>
            <h3 id="paper-main-results-title">Occamy across co-work and supporting agentic tasks.</h3>
          </div>
          <img src={sitePath("assets/occamy-main-results-10.svg?v=transparent-1")} alt="Main Occamy-1.0 benchmark results" loading="eager" decoding="async" />
        </figure>

        <figure className="efficiency-frontier" aria-labelledby="efficiency-frontier-title">
          <div className="efficiency-frontier-head">
            <div>
              <span>EFFICIENCY FRONTIER</span>
              <h3 id="efficiency-frontier-title">Aggregate cost–performance across four benchmarks.</h3>
            </div>
          </div>
          <img src={sitePath("assets/efficiency-frontier.svg")} alt="Pareto frontier comparing normalized aggregate benchmark score and aggregate inference cost per task across ten models" loading="eager" decoding="async" />
          <figcaption>Scores are min–max normalized within each benchmark and averaged equally. Cost is computed per task inside each benchmark, then averaged equally across Claw-Eval, WildClawBench, AutomationBench, and GDPval.</figcaption>
        </figure>

        <article className="paper-table-card comparison-table-card">
          <div className="paper-table-head"><span>FULL TABLE</span><h3>Comparable and frontier-model results</h3></div>
          <div className="results-table-wrap model-comparison-wrap">
            <table className="results-table model-comparison-table">
              <thead>
                <tr>
                  <th>{tx("Benchmark")}</th>
                  {modelComparisonModels.map((model) => <th className={model === "Occamy-1.0" ? "occamy-column" : ""} key={model}>{model}</th>)}
                </tr>
              </thead>
              {modelComparisonGroups.map(({ label, tone, rows }) => (
                <tbody key={label}>
                  <tr className={`benchmark-group-row ${tone}`}><th colSpan={modelComparisonModels.length + 1}>{label}</th></tr>
                  {rows.map(([benchmark, ...scores]) => (
                    <tr key={benchmark}>
                      <th scope="row">{benchmark}</th>
                      {scores.map((score, index) => <td className={index === 0 ? "occamy-column" : ""} key={`${benchmark}-${modelComparisonModels[index]}`}>{score}</td>)}
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
        </article>

      </section>

      <section className="section cowork-section" id="cowork">
        <div className="section-intro">
          <p className="section-index">FOUNDATION · {locale === "zh" ? "Co-work 定义" : "Definition"}</p>
          <div>
            <h2>{tx("Co-work is an")}<br />{tx("executable contract.")}</h2>
            <p>{tx("A task is complete only when the requested state exists and can be checked. Fluency alone is not the outcome.")}</p>
          </div>
        </div>

        <div className="capability-table-wrap">
          <table className="capability-table">
            <thead><tr><th>{tx("Layer")}</th><th>{tx("What it controls")}</th><th>{tx("Observable checks")}</th><th>{tx("Evaluation role")}</th></tr></thead>
            <tbody>
              <tr><th scope="row">{tx("Execution primitives")}</th><td>{tx("Tool use, search, coding, files")}</td><td>{tx("Valid calls and grounded results")}</td><td><span className="role-tag diagnostic">{tx("Diagnostic")}</span></td></tr>
              <tr><th scope="row">{tx("Coordination")}</th><td>{tx("Planning, state, recovery, verification")}</td><td>{tx("Checkpoints and readbacks")}</td><td><span className="role-tag diagnostic">{tx("Diagnostic")}</span></td></tr>
              <tr><th scope="row">{tx("End-to-end co-work")}</th><td>{tx("The full task contract")}</td><td>{tx("Final state and verifier receipt")}</td><td><span className="role-tag primary">{tx("Primary outcome")}</span></td></tr>
            </tbody>
          </table>
        </div>

        <dl className="compact-glossary">
          <div><dt>{tx("Contract")}</dt><dd>{tx("Request + initial world + tools + constraints + grader.")}</dd></div>
          <div><dt>{tx("Episode")}</dt><dd>{tx("One complete attempt, even across history rewrites.")}</dd></div>
          <div><dt>{tx("Trajectory")}</dt><dd>{tx("Tokens, tool I/O, state changes, and verification.")}</dd></div>
        </dl>
      </section>

      <section className="continuity-section">
        <div className="continuity-copy">
          <p className="section-index light">FOUNDATION · {tx("Continuity")}</p>
          <h2>{tx("History rewrites split")}<br /><em>{tx("segments—not episodes.")}</em></h2>
          <p>{tx("A rewrite changes the model’s conditioning history. It does not reset task ownership, reward, or evaluation.")}</p>
        </div>
        <figure className="paper-figure segment-visual segment-figure">
          <img src={sitePath("assets/segment-lineage.png")} alt="Segment lineage across root and subagent runs, history rewrites, handoff, and task-level outcome" loading="lazy" decoding="async" />
        </figure>
      </section>

      <section className="section method-section" id="data">
        <span className="anchor-alias" id="method" aria-hidden="true" />
        <div className="section-intro method-intro">
          <p className="section-index section-track-label track-data">DATA · {locale === "zh" ? "数据构造与准入" : "FACTORY + ADMISSION"}</p>
          <div>
            <h2>{tx("Build the world.")}<br />{tx("Then admit the task.")}</h2>
            <p>{tx("Every task ships with an environment, tools, a reference execution, negative cases, a grader, and provenance.")}</p>
          </div>
        </div>

        <figure className="paper-figure pipeline-figure">
          <img src={sitePath("assets/data-pipeline.png")} alt="Occamy data pipeline from environment and task synthesis through verification and training admission" loading="lazy" decoding="async" />
        </figure>

        <div className="audit-heading"><p className="mini-label">{tx("Admission pipeline")}</p><h3>{tx("Six gates reject rows that cannot be replayed or trusted.")}</h3></div>
        <div className="audit-table-wrap">
          <table className="audit-table">
            <thead><tr><th>{tx("Gate")}</th><th>{tx("Rejects")}</th><th>{tx("Retained records")}</th></tr></thead>
            <tbody>
              {auditGates.map(([index, title, rejects, evidence]) => (
                <tr key={title}><th scope="row"><span>{index}</span>{tx(title)}</th><td>{tx(rejects)}</td><td>{tx(evidence)}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="synthesis-grid">
          <div className="synthesis-copy">
            <p className="mini-label">{tx("Two complementary routes")}</p>
            <h3>{tx("Start from the world—or from the capability gap.")}</h3>
            <p><strong>{tx("Environment-first")}</strong> {tx("begins with a real tool surface and asks what difficult, verifiable work it makes possible.")}</p>
            <p><strong>{tx("Capability-first")}</strong> {tx("begins with a missing behavior and composes the environment required to test it.")}</p>
          </div>
          <div className="route-notes" aria-label={locale === "zh" ? "两条数据合成路线" : "Two data synthesis routes"}>
            <article><span>01</span><strong>{tx("Environment-first")}</strong><p>{locale === "zh" ? "选择真实接口和数据 → 写出任务与初始状态 → 搭好可运行环境 → 执行 gold path 和负例。" : "Select real interfaces and assets → construct request and initial state → materialize the environment → run gold and negative executions."}</p></article>
            <article><span>02</span><strong>{tx("Capability-first")}</strong><p>{locale === "zh" ? "确定要补的能力 → 明确来源和验证要求 → 编写任务 → 让模型在不知道答案的情况下完成并评分。" : "Freeze the capability target → close source and verification requirements → author a grounded task → blind solving and grading."}</p></article>
          </div>
        </div>

        <article className="data-corpus-card">
          <div className="paper-table-head"><span>DATA</span><h3>{tx("SFT corpus composition")}</h3></div>
          <p className="data-corpus-deck">{locale === "zh" ? "这张表描述进入 SFT 的训练数据，不属于训练算法或 RL 过程。" : "This table describes the admitted SFT data, separate from the optimization recipe and RL dynamics."}</p>
          <div className="training-table-wrap sft-table-wrap">
            <table className="training-table sft-table">
              <thead><tr><th>{tx("Data source")}</th><th>{tx("Samples")}</th><th>{tx("Share")}</th><th>{tx("Avg. length")}</th><th>{tx("Tokens")}</th></tr></thead>
              <tbody>{sftRows.map(([source, samples, share, avg, tokens]) => (
                <tr className={source === "Overall" ? "highlight-row" : ""} key={source}>
                  <th scope="row">{tx(source)}</th><td>{samples}</td><td>{share}</td><td>{avg}</td><td>{tokens}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </article>
      </section>

      <section className="infrastructure-section" id="infra">
        <div className="infrastructure-head">
          <div>
            <p className="section-index section-track-label track-infra">INFRA · {locale === "zh" ? "可回放执行系统" : "REPLAYABLE EXECUTION"}</p>
            <h2>{tx("Replay every layer")}<br />{tx("that matters.")}</h2>
          </div>
          <p>{tx("The harness records policy, conversation, environment, and task state so a rollout can be inspected and reproduced.")}</p>
        </div>
        <figure className="paper-figure infra-figure">
          <img src={sitePath("assets/overall-infrastructure.png")} alt="Occamy infrastructure connecting task harnesses, model execution, run recording, and learning" loading="lazy" decoding="async" />
        </figure>
        <div className="replay-matrix">
          <article><span>01</span><h3>{tx("Policy")}</h3><p>{tx("Sampled tokens, masks, log probabilities, and segment lineage.")}</p></article>
          <article><span>02</span><h3>{tx("Conversation")}</h3><p>{tx("Messages, tool-call arguments, tool results, and history rewrites.")}</p></article>
          <article><span>03</span><h3>{tx("Environment")}</h3><p>{tx("Files, services, subprocesses, external state, and side effects.")}</p></article>
          <article><span>04</span><h3>{tx("Task")}</h3><p>{tx("Provisioning, finalization, sealed grader inputs, and reward records.")}</p></article>
        </div>
      </section>

      <section className="trajectory-section" id="trajectory">
        <div className="trajectory-section-head">
          <div>
            <p className="section-index section-track-label track-eval">EVAL · REAL TRAJECTORIES</p>
            <h2>From intent<br /><em>to outcome.</em></h2>
          </div>
          <p>Three real runs: six-system coordination, connected Gmail, and multi-system root-cause analysis.</p>
        </div>

        <div className="trajectory-tabs" role="tablist" aria-label="Trajectory replays">
          {trajectoryDemos.map((trajectory, index) => (
            <button
              key={trajectory.id}
              type="button"
              role="tab"
              id={`trajectory-tab-${trajectory.id}`}
              aria-selected={trajectory.id === activeTrajectory.id}
              aria-controls="trajectory-player"
              onClick={() => setActiveTrajectoryId(trajectory.id)}
            >
              <span className={`trajectory-tab-status ${trajectory.tone}`}>{String(index + 1).padStart(2, "0")}</span>
              <strong>{trajectory.label}</strong>
            </button>
          ))}
        </div>

        <div className="trajectory-context" aria-live="polite">
          <div>
            <span className={`trajectory-context-status ${activeTrajectory.tone}`}>{tx(activeTrajectory.status)}</span>
            <h3>{tx(activeTrajectory.title)}</h3>
          </div>
          <div>
            <p>{tx(activeTrajectory.deck)}</p>
            <div className="trajectory-tools" aria-label="Tools in this trajectory">
              {activeTrajectory.tools.map((tool) => <span key={tool}><ToolIcon name={tool} />{tx(tool)}</span>)}
            </div>
          </div>
        </div>

        <div className="trajectory-receipt-grid" aria-label="Run summary">
          {activeTrajectory.receipts.map(([label, value]) => (
            <article key={label} className={`trajectory-receipt ${activeTrajectory.tone}`}>
              <span>{tx(label)}</span><strong>{tx(value)}</strong>
            </article>
          ))}
        </div>

        <div className="interactive-replay-shell" id="trajectory-player" role="tabpanel" aria-labelledby={`trajectory-tab-${activeTrajectory.id}`}>
          <div className="interactive-replay-top">
            <span><i className={activeTrajectory.tone} /> {activeTrajectory.surface} · Occamy</span>
            <a href={`${sitePath(activeTrajectory.page)}?task=${activeTrajectory.id}&speed=2&lang=${locale}`} target="_blank" rel="noreferrer">{tx("Open full replay")} ↗</a>
          </div>
          <iframe
            key={`${activeTrajectory.id}-${locale}`}
            className="replay-frame"
            src={`${sitePath(activeTrajectory.page)}?task=${activeTrajectory.id}&speed=4&autoplay=1&clean=1&lang=${locale}&v=unified`}
            title={`${tx(activeTrajectory.label)} Occamy ${tx("Trajectory")}`}
            loading="lazy"
            allow="fullscreen"
          />
          <div className="narrow-replay-cta">
            <p>The full replay needs more room than this window.</p>
            <a href={`${sitePath(activeTrajectory.page)}?task=${activeTrajectory.id}&speed=2&lang=${locale}`} target="_blank" rel="noreferrer">
              Open full trajectory <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className="game-demo-section" id="game-demo">
        <div className="game-demo-head">
          <div>
            <p className="section-index section-track-label track-eval">FINAL GENERATED ARTIFACT · PLAYABLE</p>
            <h2>Coral Dragon<br /><em>Reef Rescue.</em></h2>
          </div>
          <div className="game-demo-copy">
            <p>Generated from one coding prompt by Occamy.</p>
            <a href={sitePath("game/reef/index.html")} target="_blank" rel="noreferrer">Play full screen <span aria-hidden="true">↗</span></a>
          </div>
        </div>

        <div className="game-prompt">
          <div className="game-prompt-intro">
            <span>ORIGINAL PROMPT</span>
            <p>Build an original, polished single-file browser game titled “Coral Dragon Reef Rescue.” Create a genuinely playable 3–5 minute game in a responsive underwater reef.</p>
          </div>
          <details>
            <summary><span>Read the complete generation prompt</span><i aria-hidden="true">↘</i></summary>
            <pre>{reefGamePrompt}</pre>
          </details>
        </div>

        <div className="game-demo-stage">
          <div className="game-demo-bar">
            <span><i /> Occamy · Coral Dragon Reef Rescue</span>
            <span>Playable demo</span>
          </div>
          <iframe
            className="game-demo-frame"
            src={sitePath("game/reef/index.html")}
            title="Coral Dragon Reef Rescue generated by Occamy"
            loading="lazy"
            allow="autoplay; fullscreen"
            tabIndex={0}
            onPointerDown={(event) => event.currentTarget.focus()}
          />
          <div className="narrow-game-cta">
            <p>This game needs more room than this window.</p>
            <a href={sitePath("game/reef/index.html")} target="_blank" rel="noreferrer">
              Play full screen <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

      </section>

      <section className="section training-section" id="training">
        <div className="section-intro training-intro">
          <p className="section-index section-track-label track-training">TRAINING · {locale === "zh" ? "优化流程" : "OPTIMIZATION RECIPE"}</p>
          <div>
            <h2>{tx("Train one deployable")}<br />{tx("co-work model.")}</h2>
            <p>The latest report trains a Marathon Expert with SFT + HDPO, a Sprint Expert with SFT, merges them, then applies SAO to the unified checkpoint.</p>
          </div>
        </div>
        <div className="training-table-wrap">
          <table className="training-table">
            <thead><tr><th>{tx("Stage")}</th><th>{tx("Training signal")}</th><th>{tx("What is preserved")}</th><th>{tx("Invariant")}</th></tr></thead>
            <tbody>
              <tr><th scope="row"><span>01</span>Marathon Expert · SFT + HDPO</th><td>{tx("Stable long episodes + episode outcomes")}</td><td>{tx("Continuity, recovery, and verification")}</td><td><code>131,072-token sequences</code></td></tr>
              <tr><th scope="row"><span>02</span>Sprint Expert · SFT</th><td>{tx("Broad coding, search, and tool trajectories")}</td><td>{tx("Supporting agentic capability")}</td><td><code>full-parameter SFT</code></td></tr>
              <tr><th scope="row"><span>03</span>{tx("Uniform model soup")}</th><td>{tx("Complementary expert checkpoints")}</td><td>{tx("One checkpoint; no inference ensemble")}</td><td><code>balanced consolidation</code></td></tr>
              <tr><th scope="row"><span>04</span>{tx("SAO reinforcement learning")}</th><td>{tx("Verified episode outcomes")}</td><td>{tx("Segment lineage across history rewrites")}</td><td><code>one episode · one outcome</code></td></tr>
            </tbody>
          </table>
        </div>

        <div className="training-evidence-grid training-evidence-single">
          <figure className="paper-figure reward-figure">
            <img src={sitePath("assets/reward-explained-variance.png")} alt={locale === "zh" ? "RL 训练奖励与 critic explained variance 曲线" : "RL training reward and critic explained variance curves"} />
            <figcaption><span>{locale === "zh" ? "训练诊断" : "Training diagnostics"}</span>{tx("Reward and critic explained variance during RL training.")}</figcaption>
          </figure>
        </div>
        <div className="audit-implications">
          <span>{tx("Audit implications")}</span>
          <p>{tx("Confirm endpoint identity before comparison.")}</p>
          <p>{tx("Keep environment variation explicit.")}</p>
          <p>{tx("Measure verifier coverage and side effects—not trajectory length alone.")}</p>
        </div>
      </section>

      <section className="release-section" id="paper">
        <div className="release-copy">
          <p className="section-index">RELEASE · {tx("Public surfaces")}</p>
          <h2>{tx("Use the model.")}<br /><em>{tx("Inspect the work.")}</em></h2>
          <p>{tx("Open the product surface, model release, and public code organization.")}</p>
        </div>
        <div className="resource-links">
          <a href="https://www.accio.com/work" target="_blank" rel="noreferrer"><span>Accio Work</span><strong><ToolIcon name="Objective" />{tx("Open the co-work product")}</strong><i>↗</i></a>
          <a href="https://huggingface.co/Accio-Lab/Occamy-1.0" target="_blank" rel="noreferrer"><span>Hugging Face</span><strong><ToolIcon name="Hugging Face" />Occamy-1.0</strong><i>↗</i></a>
          <a href="https://github.com/Accio-Lab/occamy" target="_blank" rel="noreferrer"><span>GitHub</span><strong><ToolIcon name="GitHub" />Accio-Lab/occamy</strong><i>↗</i></a>
        </div>
        <div className="honesty-note">
          <span>{tx("Validation scope")}</span>
          <p>{tx("The featured Accio Work episode is a sanitized replay of a real Occamy-1.0 run. Its file outputs and successful Gmail send were independently verified after completion.")}</p>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href={sitePath("")} aria-label="Occamy home"><span className="brand-mark" aria-hidden="true"><img src={sitePath("brand/occamy.png")} alt="" /></span><span>ccamy</span></a>
        <p>Open Pareto-frontier 35B intelligence for co-work.</p>
        <p>© 2026 Accio Team</p>
      </footer>
    </main>
  );
}

export default function Home() {
  return <OccamySite />;
}
