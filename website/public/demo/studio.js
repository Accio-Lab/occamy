(function () {
  "use strict";

  var PAGE_PARAMS = new URLSearchParams(location.search);
  var LOCALE = PAGE_PARAMS.get("lang") === "zh" ? "zh" : "en";
  var UI_ZH = {
    "Task": "任务",
    "Speed": "速度",
    "Play": "播放",
    "Reset": "重置",
    "Record tab": "录制标签页",
    "Ready": "就绪",
    "Data pending": "数据待就绪",
    "Validated data required": "需要已验证数据",
    "Replaying": "回放中",
    "Complete": "完成",
    "Replay error": "回放错误",
    "Working…": "执行中…",
    "Waiting for validated replay data": "等待已验证回放数据",
    "Task prompt": "任务提示词",
    "Original task prompt · sent": "原始任务提示词 · 已发送",
    "Trajectory phase": "轨迹阶段",
    "Continue the evidence chain": "继续证据链",
    "Work": "执行",
    "Artifacts": "产物",
    "Files": "文件",
    "Artifact": "产物",
    "Rendered": "渲染",
    "Source": "源码",
    "No file selected": "未选择文件",
    "Workspace preview": "工作区预览",
    "Select an artifact to inspect it": "选择一个产物进行检查",
    "Wrap off": "自动换行：关",
    "Replay data pending": "回放数据待就绪",
    "Prompt · what the user asked": "提示词 · 用户要求",
    "12 sec read": "阅读约 12 秒",
    "Operation": "操作",
    "Evidence": "证据",
    "Why it matters": "意义",
    "Short · GitHub identity": "短 · GitHub 身份确认",
    "Medium · Candidate + Gmail": "中 · 候选人 + Gmail",
    "Long · Release readiness": "长 · 发布就绪审计",
    "Verify a canonical GitHub repository": "核验规范 GitHub 仓库",
    "Candidate deduplication with verified Gmail send": "候选人去重与 Gmail 发送验证",
    "Audit cross-app release readiness": "审计跨应用发布就绪状态",
    "Connected tools": "已连接工具",
    "Worked for ": "执行耗时 ",
    "Search mail": "搜索邮件",
    "Connected Gmail": "已连接 Gmail",
    "Compose": "写邮件",
    "Inbox": "收件箱",
    "Starred": "已加星标",
    "Snoozed": "已暂停",
    "Sent": "已发送",
    "Drafts": "草稿",
    "More": "更多",
    "Verified Gmail send": "Gmail 发送成功已验证",
    "Pre-search": "发送前检索",
    "Send once": "发送一次",
    "Post-search": "发送后检索",
    "Send verified": "发送成功已验证"
  };

  function tr(value) {
    if (LOCALE !== "zh") return value;
    return Object.prototype.hasOwnProperty.call(UI_ZH, value) ? UI_ZH[value] : value;
  }

  document.documentElement.lang = LOCALE === "zh" ? "zh-CN" : "en";

  var PENDING_RECRUITING = {
    id: "recruiting",
    title: "Candidate deduplication with verified Gmail send",
    prompt: "# Verified replay data pending\n\nThe formal recruiting replay will become available only after a clean Accio Work run passes independent validation.",
    model: "Occamy-1.0",
    worked: "—",
    context: "",
    workspaceRoot: "/workspace/recruiting-dedup",
    steps: [],
    events: [],
    markdown: "",
    artifacts: [],
    tree: [],
    validation: { status: "PENDING" },
    available: false
  };

  var OPTIONAL_TASKS = {
    onboarding: {
      id: "onboarding",
      title: "Coordinate three new-hire arrivals",
      prompt: "Coordinate onboarding for three new hires across policy, equipment, people, calendars, email, and follow-up tasks. Resolve ambiguous manager names by department. If a manager is missing, preserve the notice as a draft instead of guessing a recipient.",
      model: "Occamy-1.0",
      worked: "2m 08s",
      context: "22 tool calls",
      workspaceRoot: "/workspace/onboarding",
      tools: ["Gmail", "Knowledge", "Inventory", "Contacts", "Calendar", "Tasks"],
      steps: ["Read the operating context", "Resolve people and availability", "Apply the communication policy", "Commit schedule and follow-up"],
      intro: {
        icon: "01",
        meta: "Onboarding · six systems",
        title: "Turn one HR request into a committed arrival plan",
        operation: "Gmail + Knowledge + Inventory + Contacts + Calendar + Tasks",
        body: "Three hires need equipment, the correct manager, a shared training slot, and owned follow-up work.",
        meaning: "The hard part is keeping the same three people aligned while each system reveals a different constraint.",
        result: "3 hires · 6 systems"
      },
      chapters: [
        { icon: "01", meta: "Context · phase 1 of 4", title: "Read the request, policy, stock, and Monday schedule", operation: "parallel read across four systems", body: "The initial inventory category filter returns nothing; the broader query recovers the actual equipment state.", meaning: "The run treats an empty filtered response as a query problem, not proof that inventory is absent.", result: "3 hires · 1 shortage" },
        { icon: "02", meta: "People · phase 2 of 4", title: "Resolve two managers with the same name", operation: "contact search → department match → calendar checks", body: "Engineering and Marketing map to different people; Data has no manager. All three hires are free for training.", meaning: "Department metadata prevents a plausible but wrong email recipient.", result: "2 matched · 1 absent" },
        { icon: "03", meta: "Communication · phase 3 of 4", title: "Send two notices and preserve one exception", operation: "2 sends + 1 draft", body: "The valid managers receive their plans. The Data-team notice stays a draft because no manager exists.", meaning: "The model completes the safe actions without inventing authority for the unresolved one.", result: "2 sent · 1 draft" },
        { icon: "04", meta: "Commitment · phase 4 of 4", title: "Create the training event and three owned tasks", operation: "calendar create + task create × 3", body: "The event includes all three hires and HR. Follow-up tasks retain the laptop shortage and database security review.", meaning: "The final state is operational: schedule, owners, and unresolved risks remain visible.", result: "1 event · 3 tasks" }
      ],
      outcome: { icon: "✓", meta: "Outcome", title: "Three arrivals coordinated without dropping the exception", operation: "22 tool calls · 2 sends · 1 draft · 1 event · 3 tasks", body: "Every hire reaches a concrete final state, and the missing-manager path remains safely unresolved as a draft.", meaning: "The trajectory coordinates people, resources, communication, and follow-up as one task.", result: "TASK SCORE 1.0" },
      events: [
        { seq: 1, at: "00:05", duration: "1.1s", tool: "Gmail", icon: "M", text: "Read the HR request for three Monday arrivals", result: "3 hires", status: "success", step: 0 },
        { seq: 2, at: "00:13", duration: "0.7s", tool: "Knowledge", icon: "K", text: "Load onboarding and equipment policy", result: "policy loaded", status: "success", step: 0 },
        { seq: 3, at: "00:22", duration: "0.6s", tool: "Inventory", icon: "↺", text: "Recover equipment stock after the category filter returns empty", result: "1 shortage", status: "recovery", step: 0 },
        { seq: 4, at: "00:35", duration: "0.8s", tool: "Contacts", icon: "C", text: "Resolve the Engineering and Marketing managers with the same name", result: "2 exact matches", status: "success", step: 1 },
        { seq: 5, at: "00:47", duration: "0.9s", tool: "Calendar", icon: "▦", text: "Check availability for all three hires", result: "3 calendars clear", status: "success", step: 1 },
        { seq: 6, at: "01:01", duration: "1.0s", tool: "Gmail", icon: "M", text: "Send the Engineering and Marketing onboarding notices", result: "2 sent", status: "success", step: 2 },
        { seq: 7, at: "01:15", duration: "0.6s", tool: "Gmail", icon: "▤", text: "Save the Data-team notice as a draft because no manager exists", result: "1 draft", status: "success", step: 2 },
        { seq: 8, at: "01:31", duration: "0.8s", tool: "Calendar", icon: "▦", text: "Create the 10:00–12:00 training event", result: "event created", status: "success", step: 3 },
        { seq: 9, at: "01:46", duration: "0.7s", tool: "Tasks", icon: "✓", text: "Create three high-priority follow-ups", result: "3 tasks", status: "success", step: 3 },
        { seq: 10, at: "02:03", duration: "<0.1s", tool: "Files", icon: "{}", text: "Persist the coordinated final state", result: "onboarding_plan.json", status: "success", step: 3, preview: "onboarding_plan.json" },
        { seq: 11, at: "02:08", duration: "<0.1s", tool: "Files", icon: "▤", text: "Write the handoff brief", result: "onboarding_brief.md", status: "success", step: 3, preview: "onboarding_brief.md" }
      ],
      markdown: "## Onboarding plan completed\n\nThree hires now have equipment status, manager routing, a shared training event, and an owned follow-up task. Two manager notices were sent; the Data-team notice remains a draft because no department manager exists.",
      artifacts: [
        { name: "onboarding_plan.json", type: "Final state · JSON", icon: "{}", format: "json", content: { hires: 3, communication: { sent: 2, drafts: 1 }, training: { date: "2026-03-09", time: "10:00–12:00", attendees: 4, status: "created" }, follow_up_tasks: 3, exceptions: [{ team: "Data", action: "draft retained", reason: "department manager unavailable" }], equipment: [{ role: "Engineering", item: "MacBook Pro", status: "ready" }, { role: "Marketing", item: "MacBook Air", status: "shortage" }, { role: "Data", item: "Workstation", status: "ready" }] } },
        { name: "onboarding_brief.md", type: "Handoff · MD", icon: "▤", format: "markdown", content: "# Monday onboarding\n\n| Team | Manager notice | Equipment | Follow-up |\n| --- | --- | --- | --- |\n| Engineering | Sent | MacBook Pro ready | Desk + GitLab |\n| Marketing | Sent | MacBook Air shortage | Temporary device |\n| Data | Draft saved | Workstation ready | Security review |\n\nTraining is scheduled for **10:00–12:00** with all three hires and HR." }
      ],
      tree: [{ name: "outputs", type: "folder" }, { name: "onboarding_plan.json", type: "file", depth: 1 }, { name: "onboarding_brief.md", type: "file", depth: 1 }],
      validation: { status: "PASS" },
      replayMs: 128000,
      available: true
    },
    restock: {
      id: "restock",
      title: "Trace three failed restock chains",
      prompt: "Find recent failed restock jobs, trace each failure to its supplier integration, identify the products below safety stock, and produce an ordered repair plan. If a filtered query returns nothing, test the query before concluding the records do not exist.",
      model: "Occamy-1.0",
      worked: "1m 36s",
      context: "13 tool calls",
      workspaceRoot: "/workspace/restock-analysis",
      tools: ["Scheduler", "Config", "Inventory", "Files"],
      steps: ["Recover the failed jobs", "Inspect supplier integrations", "Join cause to stock impact", "Write the repair plan"],
      intro: { icon: "01", meta: "Restock · root cause", title: "Turn three failed jobs into three explicit repair paths", operation: "Scheduler + Config + Inventory", body: "The workflow must connect each job failure to one integration and one affected product.", meaning: "A list of failures is not enough; cause, impact, and next action must remain joined.", result: "3 failure chains" },
      chapters: [
        { icon: "01", meta: "Scheduler · phase 1 of 4", title: "Recover the jobs after an empty filtered response", operation: "filtered query → empty → broader query", body: "Removing the unsupported status filter reveals three recent failures.", meaning: "The model repairs the query before reasoning about the business state.", result: "3 jobs recovered" },
        { icon: "02", meta: "Config · phase 2 of 4", title: "Inspect the dependency behind every failed job", operation: "integration status + error rate + credential state", body: "The three causes separate cleanly: API timeout, disabled integration, and expired credentials.", meaning: "Different failure modes require different repairs.", result: "3 root causes" },
        { icon: "03", meta: "Inventory · phase 3 of 4", title: "Join each cause to stock below its safety threshold", operation: "job → integration → product", body: "Each supplier path maps to one affected inventory line.", meaning: "The analysis now explains both why replenishment stopped and what is at risk.", result: "3 affected products" },
        { icon: "04", meta: "Plan · phase 4 of 4", title: "Order the repair and replenishment work", operation: "prioritize access repair → rerun → restock", body: "The output preserves all three chains in JSON and a concise operator brief.", meaning: "The final plan can be executed without repeating the investigation.", result: "3 ordered actions" }
      ],
      outcome: { icon: "✓", meta: "Outcome", title: "Every stockout has a cause, impact, and next action", operation: "3 jobs · 3 integrations · 3 products", body: "The final artifacts keep each failure chain intact and prioritize the remediation sequence.", meaning: "The run converts fragmented operational state into an executable repair plan.", result: "TASK SCORE 1.0" },
      events: [
        { seq: 1, at: "00:04", duration: "0.5s", tool: "Scheduler", icon: "⌕", text: "Query restock jobs with the requested status filter", result: "0 jobs", status: "recovery", step: 0 },
        { seq: 2, at: "00:11", duration: "0.7s", tool: "Scheduler", icon: "↺", text: "Remove the bad filter and recover recent failures", result: "3 failed jobs", status: "recovery", step: 0 },
        { seq: 3, at: "00:24", duration: "0.8s", tool: "Config", icon: "◇", text: "Read active and inactive supplier integrations", result: "3 dependencies", status: "success", step: 1 },
        { seq: 4, at: "00:37", duration: "0.6s", tool: "Config", icon: "!", text: "Map IT equipment to the high-error supplier API", result: "API timeout", status: "success", step: 1 },
        { seq: 5, at: "00:48", duration: "0.5s", tool: "Config", icon: "!", text: "Map cleaning supplies to the inactive integration", result: "service disabled", status: "success", step: 1 },
        { seq: 6, at: "00:59", duration: "0.5s", tool: "Config", icon: "!", text: "Map consumables to the expired credential", result: "credential expired", status: "success", step: 1 },
        { seq: 7, at: "01:12", duration: "0.7s", tool: "Inventory", icon: "▦", text: "Join all three failures to inventory below safety stock", result: "3 products", status: "success", step: 2 },
        { seq: 8, at: "01:24", duration: "<0.1s", tool: "Files", icon: "{}", text: "Write the machine-readable failure chains", result: "restock_chains.json", status: "success", step: 3, preview: "restock_chains.json" },
        { seq: 9, at: "01:31", duration: "<0.1s", tool: "Files", icon: "▤", text: "Write the ordered operator brief", result: "restock_report.md", status: "success", step: 3, preview: "restock_report.md" },
        { seq: 10, at: "01:36", duration: "0.1s", tool: "Files", icon: "✓", text: "Reopen both outputs and compare the three chains", result: "artifacts agree", status: "success", step: 3 }
      ],
      markdown: "## Restock repair plan ready\n\nThree failed jobs were recovered and connected to three distinct root causes: a supplier timeout, a disabled integration, and an expired credential. Each cause is paired with its affected stock and next action.",
      artifacts: [
        { name: "restock_chains.json", type: "Root cause · JSON", icon: "{}", format: "json", content: { chains: [{ job: "IT equipment restock", cause: "supplier API timeout", impact: "laptop inventory below threshold", action: "stabilize API, rerun, replenish" }, { job: "Cleaning supplies restock", cause: "integration disabled", impact: "cleaning stock below threshold", action: "enable integration, rerun, replenish" }, { job: "Consumables restock", cause: "credential expired", impact: "consumables below threshold", action: "rotate credential, rerun, replenish" }] } },
        { name: "restock_report.md", type: "Operator brief · MD", icon: "▤", format: "markdown", content: "# Restock failure chains\n\n| Job | Root cause | Affected stock | First action |\n| --- | --- | --- | --- |\n| IT equipment | Supplier API timeout | Laptops | Stabilize API |\n| Cleaning supplies | Integration disabled | Cleaning stock | Re-enable service |\n| Consumables | Credential expired | Office consumables | Rotate credential |\n\nAfter access is restored, rerun each job and replenish in safety-stock order." }
      ],
      tree: [{ name: "outputs", type: "folder" }, { name: "restock_chains.json", type: "file", depth: 1 }, { name: "restock_report.md", type: "file", depth: 1 }],
      validation: { status: "PASS" },
      replayMs: 96000,
      available: true
    },
    github: {
      id: "github",
      title: "Verify a canonical GitHub repository",
      prompt: "# GitHub repository identity\n\nUse the connected GitHub tools in read-only mode. From the supplied clues, resolve the canonical repository for the C/C++ implementation of OpenAI Whisper, confirm the current owner and exact URL, distinguish it from the adjacent LLM inference project, and persist every claim in JSON and Markdown.\n\nThis is a real Accio Work trajectory. Its exported source-ledger receipt is partial, so distinguish the captured run from an independently verified full-receipt claim.",
      model: "Occamy-1.0",
      worked: "58s",
      context: "8 trajectory events",
      workspaceRoot: "/workspace/repository-identification",
      tools: ["GitHub", "Files"],
      steps: ["Search from the technical clues", "Inspect the canonical repository", "Cross-check the adjacent project", "Persist and reopen the evidence"],
      intro: {
        icon: "GH",
        meta: "Task · repository identity",
        title: "Turn several technical clues into one auditable repository decision",
        operation: "connected GitHub read-only tools → local JSON + Markdown",
        body: "The run must resolve the canonical owner and URL, then distinguish the target from a nearby project with a similar implementation stack.",
        meaning: "A plausible search hit is not enough: every identity claim must survive a second-source comparison and artifact readback.",
        result: "4 phases · 8 observable events"
      },
      chapters: [
        {
          icon: "01",
          meta: "GitHub · phase 1 of 4",
          title: "Search from the implementation clues",
          operation: "search repositories · read-only",
          body: "The C/C++ and Whisper clues produce a leading candidate, but the run treats it as a hypothesis rather than the answer.",
          meaning: "Search narrows the field; canonical identity still requires direct repository evidence.",
          result: "Leading match found"
        },
        {
          icon: "02",
          meta: "GitHub · phase 2 of 4",
          title: "Follow the redirect and inspect the canonical source",
          operation: "open historical URL → read canonical README",
          body: "The historical path resolves to ggml-org/whisper.cpp, whose README identifies C/C++ inference for OpenAI Whisper.",
          meaning: "Owner, URL, language, and project purpose now come from the canonical repository itself.",
          result: "ggml-org/whisper.cpp"
        },
        {
          icon: "03",
          meta: "GitHub · phase 3 of 4",
          title: "Disambiguate the adjacent inference project",
          operation: "inspect ggml-org/llama.cpp → compare project purpose",
          body: "The adjacent repository also implements inference in C/C++, but it targets large language models rather than Whisper speech recognition.",
          meaning: "The comparison prevents a surface-level language match from becoming an identity error.",
          result: "Speech target confirmed"
        },
        {
          icon: "04",
          meta: "Files · phase 4 of 4",
          title: "Persist the decision twice, then read it back",
          operation: "write JSON + Markdown → reopen both artifacts",
          body: "The structured receipt and human-readable brief record the same owner, URL, language, and adjacent-project distinction.",
          meaning: "The final answer is backed by inspectable artifacts, while the partial source-ledger boundary remains explicit.",
          result: "2 artifacts agree"
        }
      ],
      outcome: {
        icon: "✓",
        meta: "Outcome · real run, partial receipt",
        title: "Canonical identity resolved without hiding the evidence boundary",
        operation: "8 events · 2 artifacts · zero GitHub writes",
        body: "Both outputs name ggml-org/whisper.cpp and distinguish it from ggml-org/llama.cpp using the captured read-only path.",
        meaning: "The run is real; the exported source ledger is partial, so the replay stops short of an independently verified full-receipt claim.",
        result: "REAL RUN · PARTIAL RECEIPT"
      },
      events: [
        { seq: 1, at: "00:04", duration: "1.2s", tool: "GitHub", icon: "⌕", text: "Search for the C/C++ implementation of OpenAI Whisper", result: "leading match found", status: "success", step: 0 },
        { seq: 2, at: "00:11", duration: "0.8s", tool: "GitHub", icon: "↗", text: "Follow the historical repository URL to its canonical owner", result: "ggml-org/whisper.cpp", status: "success", step: 1 },
        { seq: 3, at: "00:18", duration: "1.0s", tool: "GitHub", icon: "▱", text: "Read the canonical README and implementation summary", result: "C/C++ · Whisper inference", status: "success", step: 1 },
        { seq: 4, at: "00:26", duration: "0.9s", tool: "GitHub", icon: "⇄", text: "Inspect ggml-org/llama.cpp as the adjacent project", result: "LLM inference · not the target", status: "success", step: 2 },
        { seq: 5, at: "00:34", duration: "0.2s", tool: "Analysis", icon: "◇", text: "Bind owner, repository, language, and distinction to exact URLs", result: "one canonical identity", status: "success", step: 2 },
        { seq: 6, at: "00:42", duration: "<0.1s", tool: "Files", icon: "{}", text: "Write structured identity evidence", result: "repository_identity.json", status: "success", step: 3, preview: "repository_identity.json" },
        { seq: 7, at: "00:49", duration: "<0.1s", tool: "Files", icon: "▤", text: "Write the human-readable repository brief", result: "repository_brief.md", status: "success", step: 3, preview: "repository_brief.md" },
        { seq: 8, at: "00:56", duration: "0.1s", tool: "Files", icon: "✓", text: "Reopen JSON and Markdown and compare every identity field", result: "artifacts agree", status: "success", step: 3 }
      ],
      markdown: "## Repository identity prepared\n\nThe real Accio Work run resolves the historical URL to **ggml-org/whisper.cpp**, distinguishes it from **ggml-org/llama.cpp**, and persists the same evidence in structured JSON and readable Markdown.\n\nThe exported source-ledger receipt is partial, so the page reports that evidence boundary without treating the trajectory as simulated.",
      artifacts: [
        { name: "repository_identity.json", type: "Evidence · JSON", icon: "{}", format: "json", content: {
          replay_status: "REAL_RUN_RECEIPT_PARTIAL",
          canonical_repository: "ggml-org/whisper.cpp",
          canonical_url: "https://github.com/ggml-org/whisper.cpp",
          primary_language: "C++",
          identity: "High-performance inference of OpenAI's Whisper model",
          adjacent_project: {
            repository: "ggml-org/llama.cpp",
            distinction: "LLM inference in C/C++; not the requested speech-recognition implementation"
          },
          evidence: [
            "Historical URL redirects to the canonical ggml-org repository",
            "README identifies OpenAI Whisper inference and a plain C/C++ implementation",
            "Adjacent llama.cpp repository serves a different model family"
          ],
          receipt_status: "SOURCE_LEDGER_PENDING"
        } },
        { name: "repository_brief.md", type: "Document · MD", icon: "▤", format: "markdown", content: "# Repository identity brief\n\n## Decision\n\nThe canonical match is **ggml-org/whisper.cpp**. It is the C/C++ implementation for high-performance inference of OpenAI's Whisper model.\n\n| Claim | Evidence |\n| --- | --- |\n| Canonical owner | `ggml-org` after the historical URL redirect |\n| Repository | `whisper.cpp` |\n| Primary language | C++ |\n| Adjacent project | `ggml-org/llama.cpp` targets LLM inference, not Whisper ASR |\n\n## Persisted evidence\n\n- Exact canonical URL recorded in JSON.\n- Owner, language, and project distinction agree across both artifacts.\n- No write operation was sent to GitHub.\n\n## Verification boundary\n\nThis is a real Accio Work trajectory. The exported source-ledger receipt is partial, so the release does not claim independent full-receipt verification." }
      ],
      tree: [
        { name: "outputs", type: "folder" },
        { name: "repository_identity.json", type: "file", depth: 1 },
        { name: "repository_brief.md", type: "file", depth: 1 }
      ],
      validation: { status: "REAL_RUN_RECEIPT_PARTIAL" },
      replayMs: 58000,
      available: true
    },
    release: {
      id: "release",
      title: "Audit cross-app release readiness",
      prompt: "# Cross-app release-readiness brief\n\nUse GitHub, Hugging Face, and local release files to verify model identity, architecture, serving constraints, risks, and launch checks. If a connector is unavailable, label the failure before using any fallback. Persist a structured receipt, a readable brief, and a launch checklist; reopen every artifact before completion.\n\nThis captured take is diagnostic because the Hugging Face connector was unavailable and a labeled public metadata fallback was used.",
      model: "Occamy-1.0",
      worked: "3m 14s",
      context: "11 trajectory events",
      workspaceRoot: "/workspace/release-readiness",
      tools: ["GitHub", "Hugging Face", "Files"],
      steps: ["Read the release contract", "Verify source identity", "Handle the connector boundary", "Reconcile serving facts", "Write release artifacts", "Reopen and cross-check"],
      intro: {
        icon: "RL",
        meta: "Task · release readiness",
        title: "Build a launch decision whose provenance stays visible",
        operation: "GitHub + Hugging Face + local release inventory",
        body: "The run must reconcile model identity, serving facts, risks, and launch checks across three evidence surfaces.",
        meaning: "If a connector fails, recovery is allowed only when the fallback is labeled and the final verdict remains below the verified-release threshold.",
        result: "6 phases · 11 observable events"
      },
      chapters: [
        {
          icon: "01",
          meta: "Files · phase 1 of 6",
          title: "Load the release contract before collecting facts",
          operation: "read required evidence schema",
          body: "The workflow starts from the expected fields and launch gates rather than drafting a narrative from memory.",
          meaning: "The contract defines what must be verified and what must remain unresolved.",
          result: "Evidence schema loaded"
        },
        {
          icon: "02",
          meta: "GitHub · phase 2 of 6",
          title: "Anchor source and serving identity",
          operation: "inspect release source · serving code · model-card references",
          body: "Repository evidence establishes the source identity and the serving references used by the candidate package.",
          meaning: "These facts form one provenance lane; they do not substitute for model-hub evidence.",
          result: "Source identity captured"
        },
        {
          icon: "03",
          meta: "Recovery · phase 3 of 6",
          title: "Expose the connector failure before using a fallback",
          operation: "Hugging Face connector timeout → labeled public metadata",
          body: "The connected lookup does not complete. The run records that failure, then uses public metadata only as diagnostic evidence.",
          meaning: "Recovery preserves progress without silently upgrading fallback facts into connector-verified facts.",
          result: "Diagnostic fallback only"
        },
        {
          icon: "04",
          meta: "Reconciliation · phase 4 of 6",
          title: "Separate verified, local, and fallback-derived facts",
          operation: "read config + weight index + serving manifest → reconcile",
          body: "The local inventory is compared with source references while fallback-derived metadata remains in its own provenance class.",
          meaning: "Contradictory evidence can be surfaced as a risk instead of being flattened into one confident summary.",
          result: "Provenance separated"
        },
        {
          icon: "05",
          meta: "Files · phase 5 of 6",
          title: "Write the decision, evidence, and remaining gates",
          operation: "write JSON receipt + release brief + launch checklist",
          body: "Three artifacts expose the same diagnostic verdict, connector failure, fallback label, risk register, and blocking next step.",
          meaning: "Reviewers can inspect both machine-readable state and the human release rationale.",
          result: "3 artifacts persisted"
        },
        {
          icon: "06",
          meta: "Verification · phase 6 of 6",
          title: "Reopen every artifact and hold the release gate",
          operation: "read back 3 files → cross-check status, risks, provenance",
          body: "The artifacts agree, but the final verdict remains DIAGNOSTIC_WITH_FALLBACK until a connected Hugging Face replay succeeds.",
          meaning: "Internal consistency is necessary; it is not evidence of a connector pass that never happened.",
          result: "HOLD_UNTIL_CONNECTOR_REPLAY"
        }
      ],
      outcome: {
        icon: "!",
        meta: "Outcome · real diagnostic run",
        title: "A useful release package that refuses to overclaim readiness",
        operation: "11 events · 3 artifacts · one labeled connector failure",
        body: "The package reconciles available evidence and records every launch gate, while the missing connected Hugging Face check stays blocking.",
        meaning: "The strong behavior is calibrated recovery: produce inspectable work, preserve provenance, and hold the final promotion boundary.",
        result: "DIAGNOSTIC WITH FALLBACK"
      },
      events: [
        { seq: 1, at: "00:05", duration: "<0.1s", tool: "Files", icon: "▱", text: "Read the release contract and required evidence schema", result: "contract loaded", status: "success", step: 0 },
        { seq: 2, at: "00:18", duration: "1.1s", tool: "GitHub", icon: "↗", text: "Inspect the release source, serving code, and model-card references", result: "source identity captured", status: "success", step: 1 },
        { seq: 3, at: "00:35", duration: "120s", tool: "Hugging Face", icon: "!", text: "Open the connected model repository and metadata", result: "connector unavailable", status: "error", step: 2 },
        { seq: 4, at: "02:36", duration: "1.4s", tool: "Public metadata", icon: "↺", text: "Use a labeled public Hugging Face fallback", result: "diagnostic evidence only", status: "recovery", step: 2 },
        { seq: 5, at: "02:45", duration: "0.1s", tool: "Files", icon: "▱", text: "Read config, weight index, and serving manifest", result: "inventory captured", status: "success", step: 3 },
        { seq: 6, at: "02:54", duration: "0.3s", tool: "Analysis", icon: "◇", text: "Separate verified facts, unresolved risks, and fallback-derived facts", result: "provenance separated", status: "success", step: 3 },
        { seq: 7, at: "03:01", duration: "<0.1s", tool: "Files", icon: "{}", text: "Write the structured readiness receipt", result: "release_readiness.json", status: "success", step: 4, preview: "release_readiness.json" },
        { seq: 8, at: "03:06", duration: "<0.1s", tool: "Files", icon: "▤", text: "Write the evidence-grounded release brief", result: "release_readiness.md", status: "success", step: 4, preview: "release_readiness.md" },
        { seq: 9, at: "03:09", duration: "<0.1s", tool: "Files", icon: "☑", text: "Write launch gates and unresolved checks", result: "launch_checklist.md", status: "success", step: 4, preview: "launch_checklist.md" },
        { seq: 10, at: "03:12", duration: "0.1s", tool: "Files", icon: "✓", text: "Reopen all three artifacts and compare status, risks, and provenance", result: "artifacts consistent", status: "success", step: 5 },
        { seq: 11, at: "03:14", duration: "<0.1s", tool: "Analysis", icon: "◇", text: "Keep the final verdict below the connector-pass threshold", result: "DIAGNOSTIC_WITH_FALLBACK", status: "success", step: 5 }
      ],
      markdown: "## Diagnostic release package prepared\n\nThe artifacts agree on model identity, the observed serving inventory, the connector failure, and the labeled public fallback. The final verdict remains **DIAGNOSTIC_WITH_FALLBACK**—not a full connector pass.\n\nEvery risk and launch gate is visible in the JSON receipt and both Markdown documents.",
      artifacts: [
        { name: "release_readiness.json", type: "Evidence · JSON", icon: "{}", format: "json", content: {
          status: "DIAGNOSTIC_WITH_FALLBACK",
          model: "Occamy-1.0 release candidate",
          connectors: {
            github: { status: "available", use: "source and serving references" },
            hugging_face: { status: "unavailable", failure: "stream idle timeout" },
            public_metadata_fallback: { status: "used", label: "diagnostic evidence only" }
          },
          verified_inputs: ["release contract", "serving manifest", "model config", "weight index"],
          risks: [
            { id: "R1", severity: "blocking", finding: "Hugging Face connector pass is missing" },
            { id: "R2", severity: "medium", finding: "Fallback-derived facts require connector confirmation" },
            { id: "R3", severity: "low", finding: "Artifact wording must retain the diagnostic label" }
          ],
          artifacts: ["release_readiness.json", "release_readiness.md", "launch_checklist.md"],
          final_gate: "HOLD_UNTIL_CONNECTOR_REPLAY"
        } },
        { name: "release_readiness.md", type: "Document · MD", icon: "▤", format: "markdown", content: "# Release-readiness brief\n\n## Verdict\n\n**DIAGNOSTIC_WITH_FALLBACK.** The package is internally consistent, but the intended Hugging Face connector did not complete.\n\n| Evidence surface | Result | Release role |\n| --- | --- | --- |\n| GitHub source | Available | Supports source identity and serving references |\n| Local files | Available | Supports config, weight inventory, and launch gates |\n| Hugging Face connector | Unavailable | Blocks a full connector-pass claim |\n| Public metadata fallback | Labeled and captured | Diagnostic evidence only |\n\n## Risk register\n\n- **Blocking:** rerun the model metadata check through the connected Hugging Face tool.\n- **Medium:** confirm every fallback-derived fact against the connected repository.\n- **Low:** keep the diagnostic label in every exported artifact.\n\n## Decision\n\nHold the release claim until the connector replay passes. The current package remains useful for reviewing workflow recovery and artifact consistency." },
        { name: "launch_checklist.md", type: "Checklist · MD", icon: "☑", format: "markdown", content: "# Launch checklist\n\n## Ready now\n\n- [x] Source repository identity recorded\n- [x] Local config and weight inventory inspected\n- [x] Risks separated by provenance\n- [x] JSON and Markdown artifacts reopened and cross-checked\n\n## Required before release\n\n- [ ] Restore the connected Hugging Face model lookup\n- [ ] Replace fallback-derived facts with connector evidence\n- [ ] Re-run the final consistency gate\n- [ ] Promote verdict from diagnostic to verified only after the connector pass" }
      ],
      tree: [
        { name: "outputs", type: "folder" },
        { name: "release_readiness.json", type: "file", depth: 1 },
        { name: "release_readiness.md", type: "file", depth: 1 },
        { name: "launch_checklist.md", type: "file", depth: 1 }
      ],
      validation: { status: "DIAGNOSTIC_WITH_FALLBACK" },
      replayMs: 194000,
      available: true
    }
  };

  function asArray(value) {
    return Array.isArray(value) ? value : [];
  }

  function normalizedValidation(value) {
    if (!value) return { status: "UNKNOWN" };
    if (typeof value === "string") return { status: value.toUpperCase() };
    var copy = Object.assign({}, value);
    if (!copy.status && copy.passed === true) copy.status = "PASS";
    if (!copy.status && copy.ok === true) copy.status = "PASS";
    copy.status = String(copy.status || "UNKNOWN").toUpperCase();
    copy.finalState = String(copy.finalState || copy.final_state || "").toUpperCase();
    copy.externalSideEffect = String(copy.externalSideEffect || copy.external_side_effect || "").toUpperCase();
    return copy;
  }

  function normalizeTask(raw, id) {
    raw = raw || {};
    var events = asArray(raw.events).length ? asArray(raw.events) : asArray(raw.activities);
    var validation = normalizedValidation(raw.validation);
    var artifacts = asArray(raw.artifacts).map(function (artifact) {
      return Object.assign({ type: "File", icon: "▤", format: "text", content: "" }, artifact);
    });
    var recruitingValidationPasses = validation.status === "PASS" || (
      validation.status === "PASS_WITH_RECOVERY" &&
      validation.finalState === "PASS" &&
      validation.externalSideEffect === "EXACTLY_ONCE_PASS"
    );
    var statusAllowsReplay = id === "recruiting"
      ? recruitingValidationPasses
      : ["PASS", "PASS_WITH_RECOVERY", "REAL_RUN_RECEIPT_PARTIAL", "DIAGNOSTIC_WITH_FALLBACK"].includes(validation.status);
    return {
      id: raw.id || id,
      title: raw.title || "Accio Work replay",
      prompt: raw.prompt || "",
      displayPrompt: raw.displayPrompt || raw.prompt || "",
      model: id === "recruiting" ? "Occamy-1.0" : (raw.model || "Occamy-1.0"),
      worked: raw.worked || raw.duration || "—",
      context: raw.context || "",
      assistantTime: raw.assistantTime || "13:43:43",
      workspaceRoot: raw.workspaceRoot || raw.workspace || (raw.aliases && raw.aliases.workspace) || "/workspace",
      tools: asArray(raw.tools),
      steps: asArray(raw.steps),
      intro: raw.intro || null,
      chapters: asArray(raw.chapters),
      outcome: raw.outcome || null,
      events: events.map(function (event, index) {
        return Object.assign({ seq: index + 1, kind: "tool", tool: "Tool", icon: "◇", text: "", result: "", status: "success", step: index }, event);
      }),
      markdown: raw.markdown || raw.answer || "",
      artifacts: artifacts,
      tree: asArray(raw.tree),
      validation: validation,
      provenance: raw.provenance || {},
      selfCheck: raw.selfCheck || {},
      replayMs: Number(raw.replayMs) || Math.max(26000, events.length * 3200),
      available: raw.available !== false && statusAllowsReplay
    };
  }

  function buildTasks() {
    var real = window.REAL_RECRUITING_REPLAY;
    return {
      onboarding: normalizeTask(OPTIONAL_TASKS.onboarding, "onboarding"),
      recruiting: real ? normalizeTask(real, "recruiting") : PENDING_RECRUITING,
      restock: normalizeTask(OPTIONAL_TASKS.restock, "restock")
    };
  }

  var TASKS = buildTasks();
  var els = {
    app: document.getElementById("accioWindow"),
    taskPicker: document.getElementById("taskPicker"),
    speedPicker: document.getElementById("speedPicker"),
    play: document.getElementById("playButton"),
    reset: document.getElementById("resetButton"),
    record: document.getElementById("recordButton"),
    controlStatus: document.getElementById("controlStatus"),
    title: document.getElementById("conversationTitle"),
    model: document.getElementById("modelName"),
    footerModel: document.getElementById("footerModel"),
    prompt: document.getElementById("promptCopy"),
    promptKicker: document.getElementById("promptKicker"),
    userMessage: document.getElementById("userMessage"),
    promptComposer: document.getElementById("promptComposer"),
    composerText: document.getElementById("composerText"),
    composerSend: document.getElementById("composerSend"),
    composerContext: document.getElementById("composerContext"),
    conversationHeader: document.getElementById("conversationHeader"),
    conversationScroll: document.getElementById("conversationScroll"),
    filesPane: document.getElementById("filesPane"),
    paneTabs: document.getElementById("paneTabs"),
    filesTab: document.getElementById("filesTab"),
    artifactTab: document.getElementById("artifactTab"),
    folderSection: document.getElementById("folderSection"),
    mobileViewSwitcher: document.getElementById("mobileViewSwitcher"),
    promptPath: document.getElementById("promptPath"),
    assistant: document.getElementById("assistantMessage"),
    assistantTime: document.getElementById("assistantTime"),
    workSummary: document.getElementById("workSummary"),
    workSummaryText: document.getElementById("workSummaryText"),
    activity: document.getElementById("activityLog"),
    answer: document.getElementById("assistantAnswer"),
    artifacts: document.getElementById("artifactCards"),
    scroll: document.getElementById("conversationScroll"),
    tree: document.getElementById("folderTree"),
    workspaceName: document.getElementById("workspaceName"),
    folderRoot: document.getElementById("folderRoot"),
    filePreview: document.getElementById("filePreview"),
    previewTitle: document.getElementById("previewTitle"),
    previewSubtitle: document.getElementById("previewSubtitle"),
    previewFileIcon: document.getElementById("previewFileIcon"),
    previewModeTabs: document.getElementById("previewModeTabs"),
    renderedMode: document.getElementById("renderedMode"),
    sourceMode: document.getElementById("sourceMode"),
    previewMetrics: document.getElementById("previewMetrics"),
    wrapToggle: document.getElementById("wrapToggle"),
    previewBody: document.getElementById("previewBody"),
    validationStatus: document.getElementById("validationStatus"),
    narrativeIntro: document.getElementById("narrativeIntro"),
    narrativeMeta: document.getElementById("narrativeMeta"),
    narrativeReadTime: document.getElementById("narrativeReadTime"),
    narrativeTitle: document.getElementById("narrativeTitle"),
    narrativeSummary: document.getElementById("narrativeSummary"),
    narrativePoints: document.getElementById("narrativePoints"),
    narrativeBadge: document.getElementById("narrativeBadge"),
    narrativeCount: document.getElementById("narrativeCount"),
    narrativeProgress: document.getElementById("narrativeProgress"),
    stageSubtitle: document.getElementById("stageSubtitle"),
    stageSubtitleIcon: document.getElementById("stageSubtitleIcon"),
    stageSubtitleMeta: document.getElementById("stageSubtitleMeta"),
    stageSubtitleTitle: document.getElementById("stageSubtitleTitle"),
    stageSubtitleOperation: document.getElementById("stageSubtitleOperation"),
    stageSubtitleBody: document.getElementById("stageSubtitleBody"),
    stageSubtitleMeaning: document.getElementById("stageSubtitleMeaning"),
    stageSubtitleResult: document.getElementById("stageSubtitleResult"),
    gmailWebPage: document.getElementById("gmailWebPage"),
    gmailSearchQuery: document.getElementById("gmailSearchQuery"),
    gmailProofId: document.getElementById("gmailProofId"),
    gmailMessageSubject: document.getElementById("gmailMessageSubject"),
    gmailSenderFrom: document.getElementById("gmailSenderFrom"),
    gmailSenderTo: document.getElementById("gmailSenderTo"),
    gmailMessageBody: document.getElementById("gmailMessageBody"),
    gmailReadbackLabel: document.getElementById("gmailReadbackLabel"),
    gmailReadbackDetail: document.getElementById("gmailReadbackDetail"),
    gmailReadbackResult: document.getElementById("gmailReadbackResult"),
    githubWebPage: document.getElementById("githubWebPage"),
    githubWebTitle: document.getElementById("githubWebTitle"),
    githubWebDetail: document.getElementById("githubWebDetail"),
    githubWebResult: document.getElementById("githubWebResult"),
    hfWebPage: document.getElementById("hfWebPage"),
    hfStateTitle: document.getElementById("hfStateTitle"),
    hfStateCode: document.getElementById("hfStateCode"),
    hfProvenanceTitle: document.getElementById("hfProvenanceTitle"),
    hfProvenanceDetail: document.getElementById("hfProvenanceDetail"),
    hfWebTitle: document.getElementById("hfWebTitle"),
    hfWebDetail: document.getElementById("hfWebDetail"),
    hfWebResult: document.getElementById("hfWebResult")
  };

  function applyStaticLocale() {
    if (LOCALE !== "zh") return;
    var direct = [
      [".studio-controls > label:nth-of-type(1) > span", "任务"],
      [".studio-controls > label:nth-of-type(2) > span", "速度"],
      ["#playButton", "播放"],
      ["#resetButton", "重置"],
      ["#recordButton", "录制标签页"],
      [".mobile-view-switcher button[data-mobile-view='work']", "执行"],
      [".mobile-view-switcher button[data-mobile-view='artifacts']", "产物"],
      [".files-header strong", "文件"],
      ["#filesTab", "文件"],
      ["#artifactTab", "产物"],
      ["#renderedMode", "渲染"],
      ["#sourceMode", "源码"],
      ["#previewTitle", "未选择文件"],
      ["#previewSubtitle", "工作区预览"],
      ["#previewMetrics", "选择一个产物进行检查"],
      ["#wrapToggle", "自动换行：关"],
      ["#validationStatus", "回放数据待就绪"],
      ["#narrativeMeta", "提示词 · 用户要求"],
      ["#narrativeReadTime", "阅读约 12 秒"],
      [".gmail-search > span:nth-child(2)", "搜索邮件"],
      [".gmail-account > span:first-child", "已连接 Gmail"],
      [".gmail-compose strong", "写邮件"],
      [".gmail-nav-item:nth-of-type(1) strong", "收件箱"],
      [".gmail-proof-strip strong", "Gmail 发送成功已验证"],
      [".gmail-trajectory-receipt header strong", "Gmail 发送成功已验证"]
    ];
    direct.forEach(function (pair) {
      var node = document.querySelector(pair[0]);
      if (node) node.textContent = pair[1];
    });
    var options = {
      github: "短 · GitHub 身份确认",
      recruiting: "中 · 招聘数据 + Gmail",
      release: "长 · 发布就绪审计"
    };
    Array.from(els.taskPicker.options).forEach(function (option) {
      if (options[option.value]) option.textContent = options[option.value];
    });
    var subtitleLabels = ["操作", "证据", "意义"];
    Array.from(document.querySelectorAll(".stage-subtitle-lines b")).forEach(function (node, index) {
      if (subtitleLabels[index]) node.textContent = subtitleLabels[index];
    });
    var gmailItems = ["收件箱", "已加星标", "已暂停", "已发送", "草稿", "更多"];
    Array.from(document.querySelectorAll(".gmail-nav-item strong, .gmail-nav-item > span:last-child")).forEach(function (node, index) {
      if (gmailItems[index]) node.textContent = gmailItems[index];
    });
    var receiptLabels = ["发送前检索", "发送一次", "发送后检索", "发送成功已验证"];
    Array.from(document.querySelectorAll(".gmail-trajectory-receipt li strong")).forEach(function (node, index) {
      if (receiptLabels[index]) node.textContent = receiptLabels[index];
    });
  }

  applyStaticLocale();

  var currentTask = "recruiting";
  var replayController = null;
  var mediaRecorder = null;
  var recordedChunks = [];
  var recordingStream = null;
  var readyFiles = new Set();
  var activePreview = "";
  var previewMode = "rendered";
  var previewModeByFile = new Map();
  var previewScrollByFile = new Map();
  var previewWrapped = false;
  var lastActivityStep = -1;
  var activeGmailStage = 0;
  var gmailSearchCount = 0;
  var gmailReadbackCount = 0;

  var NARRATIVE_STAGES = [
    {
      key: "task",
      meta: "Prompt → Candidate cleanup",
      title: "Find duplicates without changing candidate data",
      summary: "Five candidate records contain two duplicate pairs.",
      points: [
        "Match them only after lowercasing and trimming the email: rows 2–3 and rows 5–6.",
        "Mark those four rows as Duplicate, and keep row 4 unchanged.",
        "Preserve every record, key, source value, and original order. Never merge, delete, or reorder a candidate."
      ],
      badge: "5 rows in · 5 rows out",
      promptTarget: "Candidate cleanup",
      promptLabel: "Candidate cleanup",
      baseHoldMs: 15800,
      readableHoldMs: 15000,
      qaHoldMs: 2200
    },
    {
      key: "gmail-rule",
      meta: "Prompt → Gmail safety contract",
      title: "Send one Gmail message safely",
      summary: "The task permits one real, self-addressed Gmail notification.",
      points: [
        "Search for the exact subject first, and require zero matches.",
        "Send one plain-text message, with no Cc, Bcc, or second send attempt.",
        "Find the message with the returned ID and verify the recipient, subject, and full body."
      ],
      badge: "1 send · verified",
      promptTarget: "Gmail safety contract",
      promptLabel: "Gmail safety contract",
      baseHoldMs: 16200,
      readableHoldMs: 15400,
      qaHoldMs: 2300
    },
    {
      key: "what-it-tests",
      meta: "Prompt → Final verification",
      title: "PASS must come from checks",
      summary: "A confident final answer is not enough.",
      points: [
        "The prompt requires all five final files to be reopened.",
        "The cleaned JSON may differ only in duplicate_flag; the CSV, Markdown, and Gmail evidence must agree.",
        "If a local check fails, fix the file, run the check again, and record the correction before the final verdict."
      ],
      badge: "Check · correct · check again",
      promptTarget: "Final verification",
      promptLabel: "Final verification",
      baseHoldMs: 16600,
      readableHoldMs: 15800,
      qaHoldMs: 2350
    }
  ];

  var GMAIL_STAGES = [
    {
      operation: "search_gmail_messages · exact-subject query",
      title: "Check for duplicates before sending",
      body: "The exact-subject search returned 0 messages.",
      meaning: "This proves no pre-existing demo message was selected, so one new send will not duplicate the test notification.",
      result: "0 matches before send",
      holdMs: 12000,
      floorMs: 1500,
      receiptTitle: "Before-send search",
      receiptDetail: "Exact subject absent before sending"
    },
    {
      operation: "send_gmail_message · plain text · no retry",
      title: "Send the notification exactly once",
      body: "One send call used no Cc/Bcc and returned mapped ID MSG-001.",
      meaning: "The only external side effect is one self-addressed test email.",
      result: "1 call · MSG-001",
      holdMs: 13200,
      floorMs: 1600,
      receiptTitle: "Send exactly once",
      receiptDetail: "1 call · retry false · MSG-001"
    },
    {
      operation: "search_gmail_messages · same exact subject",
      title: "Locate the message created by that send",
      body: "The follow-up search returned 1 match mapped to the same ID MSG-001.",
      meaning: "This links the verified message to the single send call.",
      result: "1 match · same ID",
      holdMs: 12800,
      floorMs: 1600,
      receiptTitle: "After-send search",
      receiptDetail: "1 match · same MSG-001"
    },
    {
      operation: "get_gmail_message_content · verify sent message",
      title: "Verify the Gmail notification was sent successfully",
      body: "The sent message matched the requested sender, recipient, exact subject, and complete plain-text body.",
      meaning: "The connected Gmail result confirms that the requested notification was sent successfully.",
      result: "Send verified",
      holdMs: 28000,
      floorMs: 5000,
      receiptTitle: "Send verified",
      receiptDetail: "Recipient, subject, and body match"
    }
  ];

  function wait(ms, signal) {
    return new Promise(function (resolve, reject) {
      var id = setTimeout(resolve, ms);
      if (signal) {
        signal.addEventListener("abort", function () {
          clearTimeout(id);
          reject(new DOMException("Replay cancelled", "AbortError"));
        }, { once: true });
      }
    });
  }

  function playbackSpeed() {
    return Math.max(1, Number(els.speedPicker.value) || 1);
  }

  function readingDurationMs(parts, minimum, maximum) {
    var words = parts.join(" ").trim().split(/\s+/).filter(Boolean).length;
    return Math.max(minimum, Math.min(maximum, Math.round(words / 4.1 * 1000 + 1000)));
  }

  function narrativeHoldMs(stage) {
    var speed = playbackSpeed();
    if (speed >= 12) return stage.qaHoldMs;
    return Math.max(stage.readableHoldMs, stage.baseHoldMs / speed);
  }

  function gmailStageHoldMs(stage) {
    var speed = playbackSpeed();
    if (speed >= 12) return stage.floorMs;
    var readable = readingDurationMs(
      [stage.title, stage.operation, stage.body, stage.meaning, stage.result],
      6200,
      7600
    );
    return Math.max(readable, stage.holdMs / speed);
  }

  function hideNarrativeIntro() {
    if (!els.narrativeIntro) return;
    els.narrativeIntro.classList.remove("visible", "reading");
    els.narrativeIntro.setAttribute("aria-hidden", "true");
    els.narrativeIntro.dataset.stage = "";
    if (els.narrativeProgress) els.narrativeProgress.style.animation = "none";
  }

  function clearPromptFocus() {
    if (els.app) els.app.classList.remove("prompt-guided");
    if (els.previewBody) {
      Array.from(els.previewBody.querySelectorAll(".prompt-focus")).forEach(function (node) {
        node.classList.remove("prompt-focus");
      });
    }
    var task = TASKS[currentTask];
    var artifact = task && artifactFor(task, activePreview);
    if (artifact && els.previewSubtitle) {
      els.previewSubtitle.textContent = artifact.type || artifact.format || "Workspace output";
    }
  }

  function focusPromptSection(stage) {
    if (!els.previewBody || !stage.promptTarget) return;
    Array.from(els.previewBody.querySelectorAll(".prompt-focus")).forEach(function (node) {
      node.classList.remove("prompt-focus");
    });
    var candidates = Array.from(els.previewBody.querySelectorAll("h1,h2,h3,p,li"));
    var target = candidates.find(function (node) {
      return String(node.textContent || "").trim().toLowerCase().includes(stage.promptTarget.toLowerCase());
    });
    if (!target) return;
    target.classList.add("prompt-focus");
    var stageNumber = NARRATIVE_STAGES.indexOf(stage) + 1;
    els.previewSubtitle.textContent = stageNumber + " / " + NARRATIVE_STAGES.length + " · " + (stage.promptLabel || stage.promptTarget);
    var targetRect = target.getBoundingClientRect();
    var previewRect = els.previewBody.getBoundingClientRect();
    var top = Math.max(0, els.previewBody.scrollTop + targetRect.top - previewRect.top - 96);
    els.previewBody.scrollTo({ top: top, behavior: playbackSpeed() >= 12 ? "auto" : "smooth" });
    if (window.__ACCIO_REPLAY_QA__) {
      window.__ACCIO_REPLAY_QA__.promptSectionsSeen = Array.from(new Set(
        asArray(window.__ACCIO_REPLAY_QA__.promptSectionsSeen).concat(stage.promptTarget)
      ));
    }
  }

  async function showNarrativeStage(stage, index, signal, holdLimit) {
    var hold = Math.min(narrativeHoldMs(stage), Number.isFinite(holdLimit) ? holdLimit : Infinity);
    var speed = playbackSpeed();
    els.narrativeMeta.textContent = stage.meta;
    els.narrativeTitle.textContent = stage.title;
    els.narrativeSummary.textContent = stage.summary;
    els.narrativeBadge.textContent = stage.badge;
    els.narrativeCount.textContent = String(index + 1) + " / " + NARRATIVE_STAGES.length;
    els.narrativeReadTime.textContent = speed >= 12 ? "QA preview" : Math.ceil(hold / 1000) + " sec read";
    els.narrativePoints.replaceChildren();
    stage.points.forEach(function (point) {
      var item = document.createElement("li");
      item.textContent = point;
      els.narrativePoints.append(item);
    });
    els.narrativeIntro.dataset.stage = stage.key;
    els.narrativeIntro.style.setProperty("--narrative-hold", hold + "ms");
    els.narrativeIntro.classList.remove("reading");
    if (els.narrativeProgress) {
      els.narrativeProgress.style.animation = "none";
      void els.narrativeProgress.offsetWidth;
      els.narrativeProgress.style.animation = "";
    }
    els.narrativeIntro.classList.add("visible", "reading");
    els.narrativeIntro.setAttribute("aria-hidden", "false");
    if (window.__ACCIO_REPLAY_QA__) {
      window.__ACCIO_REPLAY_QA__.narrativeStagesSeen = Array.from(new Set(
        asArray(window.__ACCIO_REPLAY_QA__.narrativeStagesSeen).concat(stage.key)
      ));
    }

    var lead = speed >= 12 ? 100 : 620;
    var revealBudget = speed >= 12 ? Math.max(500, hold - 260) : Math.min(3800, hold * .30);
    var gap = Math.max(110, revealBudget / Math.max(1, stage.points.length));
    var began = performance.now();
    await wait(lead, signal);
    for (var i = 0; i < els.narrativePoints.children.length; i += 1) {
      els.narrativePoints.children[i].classList.add("visible");
      await wait(gap, signal);
    }
    var elapsed = performance.now() - began;
    if (elapsed < hold) await wait(hold - elapsed, signal);
  }

  function showStageRail() {
    if (!els.stageSubtitle) return;
    els.app.classList.add("stage-guided");
    els.stageSubtitle.classList.add("visible");
    els.stageSubtitle.setAttribute("aria-hidden", "false");
  }

  function resetStageRail() {
    if (!els.stageSubtitle) return;
    els.app.classList.remove("stage-guided", "gmail-guided");
    els.stageSubtitle.classList.remove("visible", "revealing", "tracking", "switching");
    els.stageSubtitle.setAttribute("aria-hidden", "true");
    els.stageSubtitle.style.removeProperty("--subtitle-hold");
  }

  function restartStageSubtitleProgress(hold) {
    if (!els.stageSubtitle) return;
    els.stageSubtitle.style.setProperty("--subtitle-hold", hold + "ms");
    els.stageSubtitle.classList.remove("tracking");
    void els.stageSubtitle.offsetWidth;
    els.stageSubtitle.classList.add("tracking");
  }

  function showChapterCue(cue, hold) {
    els.app.classList.remove("gmail-guided");
    els.stageSubtitleIcon.textContent = cue.icon || "A";
    els.stageSubtitleMeta.textContent = cue.meta;
    els.stageSubtitleTitle.textContent = cue.title;
    els.stageSubtitleOperation.textContent = cue.operation;
    els.stageSubtitleBody.textContent = cue.body;
    els.stageSubtitleMeaning.textContent = cue.meaning;
    els.stageSubtitleResult.textContent = cue.result;
    showStageRail();
    restartStageSubtitleProgress(hold);
    if (window.__ACCIO_REPLAY_QA__) {
      window.__ACCIO_REPLAY_QA__.chapterCuesSeen = Array.from(new Set(
        asArray(window.__ACCIO_REPLAY_QA__.chapterCuesSeen).concat(cue.meta)
      ));
    }
  }

  function chapterCueHold(kind) {
    var speed = playbackSpeed();
    if (speed >= 12) return kind === "outcome" ? 1050 : 760;
    if (speed >= 4) return kind === "outcome" ? 3200 : kind === "intro" ? 3000 : 2300;
    return kind === "outcome" ? 6500 : kind === "intro" ? 5600 : 4400;
  }

  async function presentChapterCue(cue, kind, signal, keepVisible) {
    if (!cue) return;
    var hold = chapterCueHold(kind);
    var alreadyVisible = els.stageSubtitle.classList.contains("visible");
    if (alreadyVisible) {
      els.stageSubtitle.classList.add("switching");
      await wait(playbackSpeed() >= 12 ? 70 : 150, signal);
    }
    showChapterCue(cue, hold);
    els.stageSubtitle.classList.remove("switching");
    await wait(hold, signal);
    if (!keepVisible) {
      els.stageSubtitle.classList.remove("visible", "tracking");
      els.stageSubtitle.setAttribute("aria-hidden", "true");
      await wait(playbackSpeed() >= 12 ? 90 : 260, signal);
      resetStageRail();
    }
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function inlineMarkdown(value) {
    return escapeHtml(value)
      .replace(/\x60([^\x60]+)\x60/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>");
  }

  function renderMarkdown(value) {
    var lines = String(value || "").replace(/\r\n/g, "\n").split("\n");
    var html = [];
    var paragraph = [];
    var listType = "";
    var listItems = [];
    var code = [];
    var inCode = false;

    function flushParagraph() {
      if (!paragraph.length) return;
      html.push("<p>" + paragraph.map(inlineMarkdown).join("<br>") + "</p>");
      paragraph = [];
    }

    function flushList() {
      if (!listItems.length) return;
      html.push("<" + listType + ">" + listItems.map(function (item) {
        var checked = /^\[x\]\s/i.test(item);
        var body = item.replace(/^\[(?:x| )\]\s/i, "");
        return "<li" + (checked ? ' class="check"' : "") + ">" + (checked ? "✓ " : "") + inlineMarkdown(body) + "</li>";
      }).join("") + "</" + listType + ">");
      listType = "";
      listItems = [];
    }

    function flushCode() {
      html.push("<pre><code>" + escapeHtml(code.join("\n")) + "</code></pre>");
      code = [];
    }

    function tableCells(line) {
      return String(line || "").trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map(function (cell) {
        return cell.trim();
      });
    }

    function isTableDivider(line) {
      var cells = tableCells(line);
      return cells.length > 1 && cells.every(function (cell) { return /^:?-{3,}:?$/.test(cell); });
    }

    for (var lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
      var line = lines[lineIndex];
      if (/^\s*\x60\x60\x60/.test(line)) {
        if (inCode) {
          flushCode();
          inCode = false;
        } else {
          flushParagraph();
          flushList();
          inCode = true;
        }
        continue;
      }
      if (inCode) {
        code.push(line);
        continue;
      }
      if (line.includes("|") && isTableDivider(lines[lineIndex + 1])) {
        flushParagraph();
        flushList();
        var headings = tableCells(line);
        var rows = [];
        lineIndex += 2;
        while (lineIndex < lines.length && lines[lineIndex].includes("|") && lines[lineIndex].trim()) {
          rows.push(tableCells(lines[lineIndex]));
          lineIndex += 1;
        }
        lineIndex -= 1;
        html.push("<div class=\"md-table-wrap\"><table><thead><tr>" + headings.map(function (cell) {
          return "<th>" + inlineMarkdown(cell) + "</th>";
        }).join("") + "</tr></thead><tbody>" + rows.map(function (cells) {
          return "<tr>" + headings.map(function (_, index) {
            return "<td>" + inlineMarkdown(cells[index] || "") + "</td>";
          }).join("") + "</tr>";
        }).join("") + "</tbody></table></div>");
        continue;
      }
      var heading = line.match(/^(#{1,3})\s+(.+)$/);
      var unordered = line.match(/^\s*[-*]\s+(.+)$/);
      var ordered = line.match(/^\s*\d+\.\s+(.+)$/);
      if (heading) {
        flushParagraph();
        flushList();
        var level = Math.min(3, heading[1].length);
        html.push("<h" + level + ">" + inlineMarkdown(heading[2]) + "</h" + level + ">");
      } else if (unordered) {
        flushParagraph();
        if (listType && listType !== "ul") flushList();
        listType = "ul";
        listItems.push(unordered[1]);
      } else if (ordered) {
        flushParagraph();
        if (listType && listType !== "ol") flushList();
        listType = "ol";
        listItems.push(ordered[1]);
      } else if (!line.trim()) {
        flushParagraph();
        flushList();
      } else {
        if (listType) flushList();
        paragraph.push(line);
      }
    }
    if (inCode) flushCode();
    flushParagraph();
    flushList();
    return html.join("");
  }

  function formatValidation(task) {
    var status = task.validation.status;
    if (status === "PASS") return "Run completed";
    if (status === "PASS_WITH_RECOVERY" && task.available) return "Completed after correction";
    if (status === "BLOCKED" || status === "FAIL") return "Run blocked";
    if (status === "REAL_RUN_RECEIPT_PARTIAL") return "Real run · partial receipt";
    if (status === "DIAGNOSTIC_WITH_FALLBACK") return "Real run · diagnostic fallback";
    return "Replay data pending";
  }

  function setValidationStyle(task) {
    var footer = els.validationStatus.parentElement;
    footer.classList.remove("pending", "failed", "partial", "diagnostic");
    if (task.validation.status === "BLOCKED" || task.validation.status === "FAIL") footer.classList.add("failed");
    else if (task.validation.status === "REAL_RUN_RECEIPT_PARTIAL") footer.classList.add("partial");
    else if (task.validation.status === "DIAGNOSTIC_WITH_FALLBACK") footer.classList.add("diagnostic");
    else if (!task.available) footer.classList.add("pending");
  }

  function workspaceName(path) {
    var parts = String(path || "/workspace").split("/").filter(Boolean);
    return parts[parts.length - 1] || "workspace";
  }

  function artifactFor(task, name) {
    return task.artifacts.find(function (artifact) {
      return artifact.name === name || artifact.path === name || String(artifact.path || "").endsWith("/" + name);
    });
  }

  function artifactFormat(artifact) {
    var name = String((artifact && artifact.name) || "").toLowerCase();
    var format = String((artifact && artifact.format) || "").toLowerCase();
    if (format === "json" || /\.json$/.test(name)) return "json";
    if (format === "markdown" || /\.md$/.test(name)) return "markdown";
    if (format === "csv" || /\.csv$/.test(name)) return "csv";
    return format || "text";
  }

  function rawArtifactContent(artifact) {
    var content = !artifact || artifact.content == null ? "" : artifact.content;
    var raw = typeof content === "string" ? content : JSON.stringify(content, null, 2);
    return String(raw || "");
  }

  function parseJsonContent(artifact) {
    if (!artifact) return null;
    if (artifact.content && typeof artifact.content === "object") return artifact.content;
    try {
      return JSON.parse(String(artifact.content || "null"));
    } catch (_) {
      return null;
    }
  }

  function jsonValue(value) {
    var type = value === null ? "null" : typeof value;
    var label = value === null ? "null" : type === "string" ? value : String(value);
    return "<span class=\"json-value " + type + "\">" + escapeHtml(label) + "</span>";
  }

  function renderJsonNode(value, key, depth, isRoot) {
    if (value == null || typeof value !== "object") {
      return "<div class=\"json-leaf\"><span class=\"json-key\">" + escapeHtml(key) + "</span>" + jsonValue(value) + "</div>";
    }
    var isArray = Array.isArray(value);
    var entries = isArray ? value.map(function (item, index) { return ["[" + index + "]", item]; }) : Object.entries(value);
    var shape = isArray ? "[ ]" : "{ }";
    var countLabel = entries.length + (isArray ? " items" : " keys");
    var open = isRoot || depth < 1 || entries.length <= 5;
    return "<details class=\"json-branch\"" + (open ? " open" : "") + "><summary><span class=\"json-key\">" + escapeHtml(key) + "</span><span class=\"json-shape\">" + shape + " · " + countLabel + "</span></summary><div class=\"json-children\">" + entries.map(function (entry) {
      return renderJsonNode(entry[1], entry[0], depth + 1, false);
    }).join("") + "</div></details>";
  }

  function renderJsonTree(artifact) {
    var parsed = parseJsonContent(artifact);
    if (parsed === null && rawArtifactContent(artifact).trim() !== "null") {
      return "<pre class=\"raw-artifact\"><code>" + escapeHtml(rawArtifactContent(artifact)) + "</code></pre>";
    }
    return "<div class=\"json-tree\">" + renderJsonNode(parsed, Array.isArray(parsed) ? "records" : "document", 0, true) + "</div>";
  }

  function renderCsvTable(content) {
    var rows = String(content || "").trim().split(/\r?\n/).filter(Boolean).map(function (line) {
      var cells = [];
      var current = "";
      var quoted = false;
      for (var i = 0; i < line.length; i += 1) {
        var char = line.charAt(i);
        if (char === '"' && line.charAt(i + 1) === '"') { current += '"'; i += 1; }
        else if (char === '"') quoted = !quoted;
        else if (char === "," && !quoted) { cells.push(current); current = ""; }
        else current += char;
      }
      cells.push(current);
      return cells;
    });
    if (!rows.length) return "";
    var headings = rows.shift();
    return "<div class=\"md-table-wrap csv-table\"><table><thead><tr>" + headings.map(function (cell) { return "<th>" + escapeHtml(cell) + "</th>"; }).join("") + "</tr></thead><tbody>" + rows.map(function (cells) {
      return "<tr>" + headings.map(function (_, index) { return "<td>" + escapeHtml(cells[index] || "") + "</td>"; }).join("") + "</tr>";
    }).join("") + "</tbody></table></div>";
  }

  function artifactMetrics(artifact) {
    var format = artifactFormat(artifact);
    var raw = rawArtifactContent(artifact);
    if (format === "json") {
      var parsed = parseJsonContent(artifact);
      if (Array.isArray(parsed)) return "JSON array · " + parsed.length + " records";
      if (parsed && typeof parsed === "object") return "JSON object · " + Object.keys(parsed).length + " top-level fields";
      return "JSON · " + raw.split(/\r?\n/).length + " lines";
    }
    if (format === "markdown") {
      var headings = (raw.match(/^#{1,3}\s+/gm) || []).length;
      var words = raw.trim().split(/\s+/).filter(Boolean).length;
      return "Markdown · " + headings + " sections · " + words + " words";
    }
    if (format === "csv") return "CSV · " + Math.max(0, raw.trim().split(/\r?\n/).length - 1) + " data rows";
    return (format || "text").toUpperCase() + " · " + raw.split(/\r?\n/).length + " lines";
  }

  function renderFileContent(artifact, mode) {
    if (!artifact) return "";
    var content = artifact.content == null ? "" : artifact.content;
    var format = artifactFormat(artifact);
    if (mode === "source") return "<pre class=\"raw-artifact " + (format === "json" ? "json-raw" : "") + "\"><code>" + escapeHtml(rawArtifactContent(artifact)) + "</code></pre>";
    if (artifact.name === "gmail_receipt.json") return renderGmailReceipt(artifact);
    if (format === "json") return renderJsonTree(artifact);
    if (format === "markdown") return "<article class=\"artifact-document\">" + renderMarkdown(rawArtifactContent(artifact)) + "</article>";
    if (format === "csv") return renderCsvTable(rawArtifactContent(artifact));
    return "<pre class=\"raw-artifact\"><code>" + escapeHtml(rawArtifactContent(artifact)) + "</code></pre>";
  }

  function parseArtifactJson(artifact) {
    if (!artifact) return {};
    if (artifact.content && typeof artifact.content === "object") return artifact.content;
    try {
      return JSON.parse(String(artifact.content || "{}"));
    } catch (_) {
      return {};
    }
  }

  function renderGmailReceipt(artifact) {
    var receipt = parseArtifactJson(artifact);
    var before = receipt.before_send_search || {};
    var send = receipt.send_call || {};
    var after = receipt.after_send_search || {};
    var readback1 = receipt.readback_1 || {};
    var stageValues = [
      String(before.match_count == null ? 0 : before.match_count) + " matches",
      String(send.call_count == null ? 1 : send.call_count) + " call · retry " + String(Boolean(send.retry)),
      String(after.match_count == null ? 1 : after.match_count) + " match · " + String(after.matched_message_id || send.message_id || "MSG-001"),
      String(readback1.message_id || send.message_id || "MSG-001") + " · verified"
    ];
    var receiptReady = readyFiles.has(artifact.name);
    var progress = activeGmailStage || (receiptReady ? GMAIL_STAGES.length : 0);
    var stages = GMAIL_STAGES.map(function (stage, index) {
      var number = index + 1;
      var state = activeGmailStage === number ? "active" : (number <= progress ? "complete" : "pending");
      var detail = state === "pending" ? "Waiting for this operation" : stage.receiptDetail;
      var value = state === "pending" ? "—" : stageValues[index];
      return "<div class=\"receipt-stage " + state + "\" data-gmail-stage=\"" + number + "\">" +
        "<span class=\"receipt-stage-index\">" + (state === "complete" ? "✓" : number) + "</span>" +
        "<span class=\"receipt-stage-copy\"><strong>" + escapeHtml(stage.receiptTitle) + "</strong><small>" + escapeHtml(detail) + "</small></span>" +
        "<span class=\"receipt-stage-value\">" + escapeHtml(value) + "</span></div>";
    }).join("");
    var mode = receiptReady ? "Saved evidence file" : "Building receipt from live Gmail results";
    return "<div class=\"gmail-receipt\" data-gmail-receipt=\"true\">" +
      "<div class=\"gmail-receipt-head\"><small>Exact subject</small><strong>" + escapeHtml(receipt.subject || "[Occamy Demo] Candidate deduplication verified") + "</strong>" +
      "<span class=\"gmail-receipt-live" + (activeGmailStage ? " live" : "") + "\">" + escapeHtml(mode) + "</span></div>" +
      "<div class=\"gmail-receipt-stages\">" + stages + "</div></div>";
  }

  function previewIcon(artifact) {
    if (!artifact) return "▤";
    if (artifact.icon) return artifact.icon;
    if (/\.json$/i.test(artifact.name)) return "{}";
    if (/\.csv$/i.test(artifact.name)) return "▦";
    return "▤";
  }

  function setPrimaryPane(name) {
    var artifactView = name === "artifact" && Boolean(activePreview);
    els.filesPane.dataset.viewer = artifactView ? "artifact" : "files";
    els.filesTab.setAttribute("aria-selected", artifactView ? "false" : "true");
    els.artifactTab.setAttribute("aria-selected", artifactView ? "true" : "false");
    els.folderSection.classList.toggle("active", !artifactView);
    els.filePreview.classList.toggle("active", artifactView);
  }

  function setMobileView(name) {
    var view = name === "artifacts" ? "artifacts" : "work";
    els.app.dataset.mobileView = view;
    Array.from(els.mobileViewSwitcher.querySelectorAll("button")).forEach(function (button) {
      button.setAttribute("aria-selected", button.dataset.mobileView === view ? "true" : "false");
    });
  }

  function savePreviewScroll() {
    if (!activePreview) return;
    previewScrollByFile.set(currentTask + ":" + activePreview + ":" + previewMode, els.previewBody.scrollTop);
  }

  function configurePreviewModes(artifact) {
    var format = artifactFormat(artifact);
    els.filePreview.dataset.format = format;
    els.renderedMode.textContent = format === "json" ? "Tree" : format === "csv" ? "Table" : format === "markdown" ? "Rendered" : "Preview";
    els.sourceMode.textContent = tr("Source");
    els.renderedMode.setAttribute("aria-selected", previewMode === "rendered" ? "true" : "false");
    els.sourceMode.setAttribute("aria-selected", previewMode === "source" ? "true" : "false");
    els.wrapToggle.hidden = previewMode !== "source";
    els.wrapToggle.setAttribute("aria-pressed", previewWrapped ? "true" : "false");
    els.wrapToggle.textContent = previewWrapped ? "Wrap on" : "Wrap off";
    els.filePreview.classList.toggle("is-wrapped", previewWrapped);
  }

  function renderActivePreview() {
    var artifact = artifactFor(TASKS[currentTask], activePreview);
    if (!artifact) return;
    configurePreviewModes(artifact);
    els.previewMetrics.textContent = artifactMetrics(artifact);
    els.previewBody.className = "preview-body format-" + artifactFormat(artifact) + " mode-" + previewMode;
    els.previewBody.innerHTML = renderFileContent(artifact, previewMode);
    var scrollKey = currentTask + ":" + activePreview + ":" + previewMode;
    requestAnimationFrame(function () { els.previewBody.scrollTop = previewScrollByFile.get(scrollKey) || 0; });
  }

  function setPreviewMode(mode) {
    if (!activePreview || (mode !== "rendered" && mode !== "source")) return;
    savePreviewScroll();
    previewMode = mode;
    previewModeByFile.set(currentTask + ":" + activePreview, mode);
    renderActivePreview();
  }

  function selectFile(name, force) {
    var task = TASKS[currentTask];
    var artifact = artifactFor(task, name);
    if (!artifact) return;
    if (!force && !readyFiles.has(artifact.name)) return;
    savePreviewScroll();
    activePreview = artifact.name;
    previewMode = previewModeByFile.get(currentTask + ":" + artifact.name) || "rendered";
    els.previewTitle.textContent = artifact.name;
    els.previewSubtitle.textContent = artifact.name === "gmail_receipt.json" && !readyFiles.has(artifact.name)
      ? "Live Gmail evidence · saved after verification"
      : (artifact.type || artifact.format || "Workspace output");
    els.previewFileIcon.textContent = previewIcon(artifact);
    els.artifactTab.disabled = false;
    renderActivePreview();
    setPrimaryPane("artifact");
    Array.from(els.tree.querySelectorAll(".folder-row")).forEach(function (row) {
      row.classList.toggle("active", row.dataset.file === artifact.name);
    });
  }

  function derivedTree(task) {
    if (task.tree.length) return task.tree;
    if (!task.artifacts.length) return [];
    var result = [{ name: "outputs", type: "folder", depth: 0 }];
    task.artifacts.forEach(function (artifact) {
      result.push({ name: artifact.name, type: "file", depth: 1 });
    });
    return result;
  }

  function renderTree(task) {
    els.tree.replaceChildren();
    derivedTree(task).forEach(function (item) {
      var isFolder = item.type === "folder";
      var row = document.createElement(isFolder ? "div" : "button");
      row.className = "folder-row";
      row.style.setProperty("--depth", item.depth || 0);
      if (!isFolder) {
        row.type = "button";
        row.dataset.file = item.name;
        if (!readyFiles.has(item.name)) row.classList.add("pending");
      }
      row.innerHTML = "<span>" + (isFolder ? "⌄" : previewIcon(item)) + "</span><span class=\"tree-name\">" + escapeHtml(item.name) + "</span><span class=\"tree-state\">" + (!isFolder && readyFiles.has(item.name) ? "✓" : "") + "</span>";
      if (!isFolder) row.addEventListener("click", function () { selectFile(item.name); });
      els.tree.append(row);
    });
  }

  function markFileReady(name) {
    var task = TASKS[currentTask];
    var artifact = artifactFor(task, name);
    if (!artifact) return;
    readyFiles.add(artifact.name);
    renderTree(task);
    selectFile(artifact.name, true);
  }

  function resetPreview() {
    savePreviewScroll();
    activePreview = "";
    previewMode = "rendered";
    els.previewTitle.textContent = tr("No file selected");
    els.previewSubtitle.textContent = tr("Workspace preview");
    els.previewFileIcon.textContent = "▤";
    els.previewMetrics.textContent = tr("Select an artifact to inspect it");
    els.artifactTab.disabled = true;
    els.filePreview.dataset.format = "empty";
    els.previewBody.className = "preview-body empty";
    els.previewBody.innerHTML = "<span>Files appear here as Accio Work creates and verifies them.</span>";
    els.wrapToggle.hidden = true;
    setPrimaryPane("files");
  }

  function gmailStageForEvent(event) {
    if (currentTask !== "recruiting" || String(event.kind || "").toLowerCase() !== "gmail") return 0;
    if (event.operation === "search_gmail_messages") {
      gmailSearchCount += 1;
      return gmailSearchCount === 1 ? 1 : 3;
    }
    if (event.operation === "send_gmail_message") return 2;
    if (event.operation === "get_gmail_message_content") {
      gmailReadbackCount += 1;
      return 4;
    }
    return 0;
  }

  function externalWebStageForEvent(event) {
    var seq = Number(event && event.seq);
    if (currentTask === "github" && seq >= 2 && seq <= 4) {
      return { provider: "github", phase: seq - 1, exit: seq === 4 };
    }
    if (currentTask === "release" && seq === 3) {
      return { provider: "huggingface", phase: 1, exit: false };
    }
    if (currentTask === "release" && seq === 4) {
      return { provider: "huggingface", phase: 2, exit: true };
    }
    return null;
  }

  function setWorkspaceSurfacesHidden(hidden) {
    [els.conversationHeader, els.conversationScroll, els.filesPane].forEach(function (surface) {
      if (!surface) return;
      if (hidden) {
        surface.setAttribute("inert", "");
        surface.setAttribute("aria-hidden", "true");
      } else {
        surface.removeAttribute("inert");
        surface.removeAttribute("aria-hidden");
      }
    });
  }

  function hideExternalWebPages() {
    [els.githubWebPage, els.hfWebPage].forEach(function (page) {
      if (!page) return;
      page.classList.remove("visible");
      page.setAttribute("aria-hidden", "true");
      page.dataset.phase = "0";
    });
    setWorkspaceSurfacesHidden(false);
    if (els.app.dataset.activeView === "github" || els.app.dataset.activeView === "huggingface") {
      els.app.dataset.activeView = "accio";
    }
  }

  function showExternalWebStage(stage) {
    if (!stage) return;
    hideExternalWebPages();
    var page = stage.provider === "github" ? els.githubWebPage : els.hfWebPage;
    if (!page) return;
    page.dataset.phase = String(stage.phase);
    page.classList.add("visible");
    page.setAttribute("aria-hidden", "false");
    setWorkspaceSurfacesHidden(true);
    els.app.dataset.activeView = stage.provider;

    if (stage.provider === "github") {
      var githubStages = [
        ["Canonical redirect resolved", "The historical repository path resolves to ggml-org/whisper.cpp.", "Source identity"],
        ["README confirms the technical clues", "The canonical source describes a plain C/C++ implementation for OpenAI Whisper inference.", "Target confirmed"],
        ["Adjacent project ruled out", "llama.cpp shares the implementation stack but serves LLM inference, not Whisper speech recognition.", "Disambiguated"]
      ];
      var githubCopy = githubStages[Math.max(0, stage.phase - 1)] || githubStages[0];
      els.githubWebTitle.textContent = githubCopy[0];
      els.githubWebDetail.textContent = githubCopy[1];
      els.githubWebResult.textContent = githubCopy[2];
    } else {
      var fallback = stage.phase === 2;
      els.hfStateTitle.textContent = fallback ? "Public metadata fallback opened" : "Connector unavailable";
      els.hfStateCode.textContent = fallback ? "diagnostic evidence only" : "stream idle timeout";
      els.hfProvenanceTitle.textContent = fallback ? "Fallback facts remain diagnostic" : "Connected model metadata is still required";
      els.hfProvenanceDetail.textContent = fallback
        ? "The public page is visible for continuity, but it does not satisfy the connected-tool release gate."
        : "No public-page field is promoted to connector-verified evidence.";
      els.hfWebTitle.textContent = fallback ? "Fallback used without upgrading the claim" : "Connector failure remains visible";
      els.hfWebDetail.textContent = fallback
        ? "The workflow recovers enough context to build artifacts while keeping the final release verdict on hold."
        : "The run records the failed connected lookup before considering a fallback.";
      els.hfWebResult.textContent = fallback ? "Diagnostic only" : "Not verified";
    }

    if (window.__ACCIO_REPLAY_QA__) {
      var marker = stage.provider + ":" + stage.phase;
      window.__ACCIO_REPLAY_QA__.externalWebPagesSeen = Array.from(new Set(
        asArray(window.__ACCIO_REPLAY_QA__.externalWebPagesSeen).concat(marker)
      ));
      els.app.dataset.externalWebStage = marker;
      els.app.dataset.externalWebStageCount = String(window.__ACCIO_REPLAY_QA__.externalWebPagesSeen.length);
    }
  }

  function gmailReceipt() {
    var artifact = asArray(TASKS[currentTask] && TASKS[currentTask].artifacts).find(function (candidate) {
      return candidate.name === "gmail_receipt.json";
    });
    if (!artifact || typeof artifact.content !== "string") return null;
    try {
      return JSON.parse(artifact.content);
    } catch (error) {
      return null;
    }
  }

  function sameGmailReadback(left, right) {
    if (!left || !right) return false;
    return ["message_id", "to", "from", "subject", "body"].every(function (key) {
      return String(left[key] || "") === String(right[key] || "");
    });
  }

  function readbackMatchesReceipt(receipt, readback) {
    if (!receipt || !readback) return false;
    var messageId = String(readback.message_id || "");
    return Boolean(messageId && readback.body) &&
      messageId === String(receipt.send_call && receipt.send_call.message_id || "") &&
      messageId === String(receipt.after_send_search && receipt.after_send_search.matched_message_id || "") &&
      String(readback.to || "") === String(receipt.recipient || "") &&
      String(readback.subject || "") === String(receipt.subject || "") &&
      receipt.readbacks_match_specification === true;
  }

  function showGmailWebPage(readbackNumber) {
    if (!els.gmailWebPage) return;
    var secondReadback = readbackNumber === 2;
    var receipt = gmailReceipt();
    var readback = receipt && receipt[secondReadback ? "readback_2" : "readback_1"];
    var matched = readbackMatchesReceipt(receipt, readback);
    var identical = secondReadback && matched && receipt.readbacks_identical === true &&
      sameGmailReadback(receipt.readback_1, receipt.readback_2);
    if (!readback) return;
    els.gmailWebPage.dataset.readback = String(readbackNumber);
    els.gmailWebPage.dataset.verification = secondReadback ? (identical ? "identical" : "mismatch") : (matched ? "matched" : "mismatch");
    els.gmailWebPage.classList.add("visible");
    els.gmailWebPage.setAttribute("aria-hidden", "false");
    setWorkspaceSurfacesHidden(true);
    els.gmailSearchQuery.textContent = String(receipt.before_send_search && receipt.before_send_search.query || "Exact-subject result");
    els.gmailProofId.textContent = "Sanitized replay · mapped ID " + String(readback.message_id || "message");
    els.gmailMessageSubject.textContent = String(readback.subject || "No subject");
    els.gmailSenderFrom.textContent = String(readback.from || "Unknown sender");
    els.gmailSenderTo.textContent = "to " + String(readback.to || "Unknown recipient");
    els.gmailMessageBody.textContent = String(readback.body || "No body returned");
    els.gmailReadbackLabel.textContent = "Send verified";
    els.gmailReadbackDetail.textContent = matched
      ? "Recipient, subject, and body match the requested notification."
      : "The sent message does not match the saved Gmail receipt.";
    els.gmailReadbackResult.textContent = matched ? "Verified" : "Mismatch";
    els.app.dataset.activeView = "gmail";
    if (window.__ACCIO_REPLAY_QA__) {
      window.__ACCIO_REPLAY_QA__.gmailWebPageVisible = true;
      window.__ACCIO_REPLAY_QA__.gmailWebReadbacksSeen = Array.from(new Set(
        asArray(window.__ACCIO_REPLAY_QA__.gmailWebReadbacksSeen).concat(readbackNumber)
      )).sort();
    }
  }

  function hideGmailWebPage() {
    if (!els.gmailWebPage) return;
    els.gmailWebPage.classList.remove("visible");
    els.gmailWebPage.setAttribute("aria-hidden", "true");
    els.gmailWebPage.dataset.readback = "0";
    setWorkspaceSurfacesHidden(false);
    els.app.dataset.activeView = "accio";
    if (window.__ACCIO_REPLAY_QA__) window.__ACCIO_REPLAY_QA__.gmailWebPageVisible = false;
  }

  function showGmailStage(stageNumber) {
    var stage = GMAIL_STAGES[stageNumber - 1];
    if (!stage || !els.stageSubtitle) return;
    activeGmailStage = stageNumber;
    els.app.classList.add("gmail-guided");
    Array.from(els.activity.querySelectorAll(".gmail-stage-active")).forEach(function (row) {
      row.classList.remove("gmail-stage-active");
    });
    els.stageSubtitleMeta.textContent = "Gmail · step " + stageNumber + " of " + GMAIL_STAGES.length;
    els.stageSubtitleIcon.textContent = "M";
    els.stageSubtitleTitle.textContent = stage.title;
    els.stageSubtitleOperation.textContent = stage.operation;
    els.stageSubtitleBody.textContent = stage.body;
    els.stageSubtitleMeaning.textContent = stage.meaning;
    els.stageSubtitleResult.textContent = stage.result;
    showStageRail();
    restartStageSubtitleProgress(gmailStageHoldMs(stage));
    selectFile("gmail_receipt.json", true);
    if (stageNumber >= 4) showGmailWebPage(stageNumber - 3);
    else hideGmailWebPage();
    if (window.__ACCIO_REPLAY_QA__) {
      window.__ACCIO_REPLAY_QA__.activeGmailStage = stageNumber;
      window.__ACCIO_REPLAY_QA__.gmailStagesSeen = Array.from(new Set(
        asArray(window.__ACCIO_REPLAY_QA__.gmailStagesSeen).concat(stageNumber)
      )).sort();
      window.__ACCIO_REPLAY_QA__.gmailReceiptPreview = els.previewTitle.textContent === "gmail_receipt.json";
    }
  }

  function showGmailReturnCue() {
    els.stageSubtitleIcon.textContent = "A";
    els.stageSubtitleMeta.textContent = "Accio Work · return to workspace";
    els.stageSubtitleTitle.textContent = "Save inspectable evidence and continue final verification";
    els.stageSubtitleOperation.textContent = "write · evidence/gmail_receipt.json";
    els.stageSubtitleBody.textContent = "gmail_receipt.json records the pre-send search, single send, and successful send verification.";
    els.stageSubtitleMeaning.textContent = "Accio Work returns to local artifacts only after the exactly-once Gmail contract is auditable.";
    els.stageSubtitleResult.textContent = "Receipt saved · send verified";
    showStageRail();
    restartStageSubtitleProgress(playbackSpeed() >= 12 ? 1200 : 7600);
    if (window.__ACCIO_REPLAY_QA__) window.__ACCIO_REPLAY_QA__.gmailReturnCueSeen = true;
  }

  function hideGmailStage() {
    activeGmailStage = 0;
    hideGmailWebPage();
    resetStageRail();
    Array.from(els.activity.querySelectorAll(".gmail-stage-active")).forEach(function (row) {
      row.classList.remove("gmail-stage-active");
    });
    if (activePreview === "gmail_receipt.json") selectFile("gmail_receipt.json", true);
    if (window.__ACCIO_REPLAY_QA__) window.__ACCIO_REPLAY_QA__.activeGmailStage = 0;
  }

  function taskFromUrl() {
    var requested = new URLSearchParams(location.search).get("task");
    return requested && TASKS[requested] ? requested : "recruiting";
  }

  function updateUrl(taskId) {
    var url = new URL(location.href);
    url.searchParams.set("task", taskId);
    history.replaceState({}, "", url);
  }

  function setTask(taskId, options) {
    options = options || {};
    if (!TASKS[taskId]) return;
    currentTask = taskId;
    els.taskPicker.value = taskId;
    if (options.updateHistory !== false) updateUrl(taskId);
    resetReplay();
  }

  function resetReplay() {
    if (replayController) replayController.abort();
    replayController = null;
    var task = TASKS[currentTask];
    readyFiles = new Set(asArray(task.readyFiles));
    lastActivityStep = -1;
    activeGmailStage = 0;
    gmailSearchCount = 0;
    gmailReadbackCount = 0;
    clearPromptFocus();
    hideNarrativeIntro();
    hideGmailWebPage();
    hideExternalWebPages();
    resetStageRail();
    els.app.dataset.replayState = "idle";
    els.app.dataset.task = currentTask;
    els.app.dataset.validation = task.validation.status.toLowerCase();
    delete els.app.dataset.externalWebStage;
    delete els.app.dataset.externalWebStageCount;
    setMobileView("work");
    els.controlStatus.textContent = tr(task.available ? "Ready" : "Data pending");
    els.title.textContent = tr(task.title);
    const displayModel = task.model.replace(/^Occamy-1\.0$/, "Occamy");
    els.model.textContent = displayModel;
    els.footerModel.textContent = displayModel;
    els.prompt.classList.remove("is-typing");
    els.prompt.innerHTML = currentTask === "recruiting" ? "" : renderMarkdown(task.displayPrompt);
    if (els.promptKicker) els.promptKicker.textContent = tr("Task prompt");
    if (els.composerContext) {
      var tools = task.tools.length ? task.tools.join(" + ") : (currentTask === "recruiting" ? "Files + Gmail" : "Connected tools");
      els.composerContext.innerHTML = "<span class=\"composer-plus\">+</span> Accio Work · " + escapeHtml(tools);
    }
    if (els.userMessage) els.userMessage.classList.toggle("awaiting-send", currentTask === "recruiting");
    if (els.promptComposer) {
      els.promptComposer.classList.toggle("visible", currentTask === "recruiting");
      els.promptComposer.classList.remove("sending", "handoff");
      els.promptComposer.setAttribute("aria-hidden", currentTask === "recruiting" ? "false" : "true");
    }
    if (els.composerText) {
      els.composerText.classList.remove("is-typing");
      els.composerText.textContent = "";
    }
    if (els.composerSend) els.composerSend.classList.remove("ready");
    els.promptPath.textContent = task.workspaceRoot;
    els.workspaceName.textContent = workspaceName(task.workspaceRoot);
    els.folderRoot.textContent = task.workspaceRoot;
    els.assistant.classList.remove("visible");
    els.assistantTime.textContent = task.assistantTime;
    els.workSummary.classList.add("is-working");
    els.workSummaryText.textContent = tr(task.available ? "Working…" : "Waiting for validated replay data");
    els.activity.replaceChildren();
    els.answer.replaceChildren();
    els.artifacts.replaceChildren();
    els.validationStatus.textContent = formatValidation(task);
    setValidationStyle(task);
    resetPreview();
    renderTree(task);
    els.scroll.scrollTop = 0;
    window.__ACCIO_REPLAY_QA__ = {
      task: currentTask,
      dataAvailable: task.available,
      validation: task.validation.status,
      eventCount: task.events.length,
      artifactCount: task.artifacts.length,
      state: "idle",
      promptTyped: false,
      promptSent: false,
      promptSectionsTyped: 0
    };
  }

  function eventClass(event) {
    var value = String(event.status || event.kind || "").toLowerCase();
    if (/error|fail|invalid|reject/.test(value)) return "error";
    if (/recover|retry|correct/.test(value)) return "recovery";
    return "success";
  }

  function addActivity(event) {
    var task = TASKS[currentTask];
    var stepIndex = Number.isFinite(Number(event.step)) ? Number(event.step) : 0;
    if (stepIndex !== lastActivityStep) {
      Array.from(els.activity.querySelectorAll(".activity-stage.current")).forEach(function (node) {
        node.classList.remove("current");
        node.classList.add("complete");
      });
      var stage = document.createElement("div");
      stage.className = "activity-stage current";
      stage.innerHTML = "<span>" + String(stepIndex + 1).padStart(2, "0") + "</span><strong>" + escapeHtml(task.steps[stepIndex] || tr("Continue the evidence chain")) + "</strong><small>" + escapeHtml(tr("Trajectory phase")) + "</small>";
      els.activity.append(stage);
      lastActivityStep = stepIndex;
    }
    var row = document.createElement("div");
    var state = eventClass(event);
    var isFormalRecruiting = currentTask === "recruiting";
    var tool = event.displayTool || event.tool || event.kind || "Tool";
    var text = event.displayText || event.text || "";
    var result = event.displayResult != null
      ? event.displayResult
      : (isFormalRecruiting ? "" : (event.result || event.detail || ""));
    Array.from(els.activity.querySelectorAll(".activity-row.current")).forEach(function (node) {
      node.classList.remove("current");
      node.classList.add("settled");
    });
    row.className = "activity-row " + state + " current entering";
    row.dataset.seq = String(event.seq || "");
    row.innerHTML = "<span class=\"activity-icon\">" + escapeHtml(event.icon || (state === "error" ? "!" : "✓")) + "</span><span class=\"activity-copy\"><span class=\"activity-tool\">" + escapeHtml(tool) + "</span><strong>" + escapeHtml(text) + "</strong>" + (result ? "<span class=\"activity-result\">" + escapeHtml(result) + "</span>" : "") + "</span><time>" + escapeHtml(event.at || event.duration || event.elapsed || "") + "</time>";
    els.activity.append(row);
    requestAnimationFrame(function () { row.classList.remove("entering"); });
    if (event.preview) markFileReady(event.preview);
    if (event.file) markFileReady(event.file);
    return row;
  }

  function addArtifacts(task) {
    els.artifacts.replaceChildren();
    var artifactState = task.validation.status === "REAL_RUN_RECEIPT_PARTIAL"
      ? ["Real run", "partial"]
      : task.validation.status === "DIAGNOSTIC_WITH_FALLBACK"
        ? ["Diagnostic", "diagnostic"]
        : ["Verified", "verified"];
    task.artifacts.forEach(function (artifact, index) {
      readyFiles.add(artifact.name);
      var card = document.createElement("div");
      card.className = "artifact-card";
      card.style.animationDelay = String(index * 60) + "ms";
      card.innerHTML = "<span class=\"file-icon\">" + escapeHtml(previewIcon(artifact)) + "</span><span><strong>" + escapeHtml(artifact.name) + "</strong><small>" + escapeHtml(artifact.type || artifact.format || "Workspace output") + "</small></span><span class=\"artifact-state " + artifactState[1] + "\">" + artifactState[0] + "</span>";
      card.addEventListener("click", function () { selectFile(artifact.name, true); });
      els.artifacts.append(card);
    });
    renderTree(task);
    if (task.artifacts.length) {
      var finalPreview = currentTask === "recruiting"
        ? (artifactFor(task, "gmail_receipt.json") || task.artifacts[0])
        : task.artifacts[0];
      selectFile(finalPreview.name, true);
    }
  }

  function scrollToPosition(target, behavior) {
    var max = Math.max(0, els.scroll.scrollHeight - els.scroll.clientHeight);
    els.scroll.scrollTo({ top: Math.max(0, Math.min(target, max)), behavior: behavior || "smooth" });
  }

  function smoothScroll() {
    scrollToPosition(els.scroll.scrollHeight - els.scroll.clientHeight, "smooth");
  }

  function animateScroll(target, duration, signal) {
    return new Promise(function (resolve, reject) {
      var start = els.scroll.scrollTop;
      var change = target - start;
      var began = performance.now();
      function frame(now) {
        if (signal && signal.aborted) {
          reject(new DOMException("Replay cancelled", "AbortError"));
          return;
        }
        var progress = Math.min(1, (now - began) / Math.max(1, duration));
        var eased = progress < .5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        els.scroll.scrollTop = start + change * eased;
        if (progress < 1) requestAnimationFrame(frame);
        else resolve();
      }
      requestAnimationFrame(frame);
    });
  }

  async function showPromptThenTrajectory(signal) {
    els.scroll.scrollTop = 0;
    if (currentTask === "recruiting") {
      var source = String(TASKS[currentTask].prompt || "").replace(/^#{1,3}\s+(.+)$/gm, "**$1**");
      var speed = playbackSpeed();
      var gmailStart = source.indexOf("\n**One real Gmail notification**");
      var finalStart = source.indexOf("\n**Final verification**");
      var sectionEnds = [gmailStart, finalStart, source.length];
      var typedEnd = 0;
      var charDelay = speed >= 4 ? 9 : speed >= 2 ? 14 : 20;
      var chunkSize = speed >= 4 ? 10 : speed >= 2 ? 4 : 2;

      async function typeThrough(end) {
        els.composerText.classList.add("is-typing");
        if (speed >= 12) {
          typedEnd = end;
          els.composerText.innerHTML = renderMarkdown(source.slice(0, typedEnd));
          els.composerText.scrollTop = els.composerText.scrollHeight;
          await wait(260, signal);
        } else {
          while (typedEnd < end) {
            var cursor = typedEnd;
            var headingAtCursor = (cursor === 0 || source.charAt(cursor - 1) === "\n") && source.startsWith("**", cursor);
            var headingEnd = headingAtCursor ? source.indexOf("\n", cursor) : -1;
            typedEnd = headingEnd > cursor ? Math.min(end, headingEnd) : Math.min(end, cursor + chunkSize);
            var chunk = source.slice(cursor, typedEnd);
            els.composerText.innerHTML = renderMarkdown(source.slice(0, typedEnd));
            els.composerText.scrollTop = els.composerText.scrollHeight;
            await wait(/[.!?]\s*$/.test(chunk) ? charDelay * 4 : /\n\s*$/.test(chunk) ? charDelay * 2 : charDelay, signal);
          }
        }
        els.composerText.classList.remove("is-typing");
        await wait(speed >= 12 ? 100 : speed >= 4 ? 300 : 520, signal);
      }

      els.app.classList.add("prompt-guided");
      await wait(speed >= 12 ? 80 : 220, signal);
      for (var i = 0; i < 3; i += 1) {
        var sectionLength = sectionEnds[i] - typedEnd;
        var estimatedTypingMs = speed >= 12
          ? NARRATIVE_STAGES[i].qaHoldMs
          : Math.max(2600, sectionLength / chunkSize * charDelay * .85);
        await Promise.all([
          typeThrough(sectionEnds[i]),
          showNarrativeStage(NARRATIVE_STAGES[i], i, signal, estimatedTypingMs)
        ]);
        window.__ACCIO_REPLAY_QA__.promptSectionsTyped = i + 1;
        await wait(speed >= 12 ? 80 : 220, signal);
      }

      els.composerSend.classList.add("ready");
      await wait(speed >= 12 ? 140 : 520, signal);
      els.promptComposer.classList.add("sending");
      await wait(speed >= 12 ? 140 : 420, signal);
      els.prompt.innerHTML = renderMarkdown(source);
      els.prompt.scrollTop = 0;
      if (els.promptKicker) els.promptKicker.textContent = tr("Original task prompt · sent");
      els.userMessage.classList.remove("awaiting-send", "entrance");
      window.__ACCIO_REPLAY_QA__.promptTyped = true;
      window.__ACCIO_REPLAY_QA__.promptSent = true;
      els.assistant.classList.add("visible");
      els.promptComposer.classList.add("handoff");
      els.promptComposer.classList.remove("visible");
      els.promptComposer.setAttribute("aria-hidden", "true");
      await wait(speed >= 12 ? 50 : 120, signal);
      hideNarrativeIntro();
      await wait(320, signal);
      clearPromptFocus();
      await wait(360, signal);
      els.promptComposer.classList.remove("handoff", "sending");
    } else {
      var task = TASKS[currentTask];
      await wait(Math.max(420, 1100 / playbackSpeed()), signal);
      await presentChapterCue(task.intro, "intro", signal, false);
    }
    var target = Math.max(0, els.assistant.offsetTop - 18);
    var duration = Math.max(2800, 8000 / playbackSpeed());
    await animateScroll(target, duration, signal);
  }

  async function streamAnswer(task, signal) {
    var source = String(task.markdown || "");
    var chunkSize = playbackSpeed() >= 12 ? 28 : 12;
    var content = "";
    for (var i = 0; i < source.length; i += chunkSize) {
      if (signal.aborted) throw new DOMException("Replay cancelled", "AbortError");
      content += source.slice(i, i + chunkSize);
      els.answer.innerHTML = renderMarkdown(content) + "<span class=\"stream-caret\">▍</span>";
      smoothScroll();
      await wait(Math.max(12, 55 / playbackSpeed()), signal);
    }
    els.answer.innerHTML = renderMarkdown(source);
  }

  async function runReplay() {
    resetReplay();
    var task = TASKS[currentTask];
    if (!task.available) {
      els.controlStatus.textContent = tr("Validated data required");
      return;
    }
    var controller = new AbortController();
    replayController = controller;
    var signal = controller.signal;
    var speed = playbackSpeed();
    els.app.dataset.replayState = "running";
    els.controlStatus.textContent = tr("Replaying");
    if (currentTask !== "recruiting") els.assistant.classList.add("visible");
    window.__ACCIO_REPLAY_QA__.state = "running";
    try {
      await showPromptThenTrajectory(signal);
      var interval = Math.max(230, Math.min(1250, task.replayMs * .52 / Math.max(1, task.events.length) / speed));
      var announcedChapter = -1;
      for (var i = 0; i < task.events.length; i += 1) {
        var event = task.events[i];
        var eventStep = Number.isFinite(Number(event.step)) ? Number(event.step) : 0;
        var chapterCue = currentTask !== "recruiting" && eventStep !== announcedChapter
          ? task.chapters[eventStep]
          : null;
        var externalWebStage = externalWebStageForEvent(event);
        var gmailStage = gmailStageForEvent(event);
        var activityRow = addActivity(event);
        var gmailReceiptWritten = activeGmailStage &&
          (event.preview === "gmail_receipt.json" || String(event.file || "").endsWith("/gmail_receipt.json"));
        if (gmailStage) {
          showGmailStage(gmailStage);
          activityRow.classList.add("gmail-stage-active");
        }
        smoothScroll();
        if (chapterCue) {
          await presentChapterCue(chapterCue, "chapter", signal, false);
          announcedChapter = eventStep;
        }
        if (currentTask !== "recruiting" && event.preview) {
          els.app.classList.add("artifact-revealing");
          selectFile(event.preview, true);
          await wait(speed >= 12 ? 260 : Math.max(850, 2300 / speed), signal);
          els.app.classList.remove("artifact-revealing");
        }
        if (externalWebStage) {
          showExternalWebStage(externalWebStage);
          await wait(speed >= 12 ? 520 : Math.max(interval, 4200 / speed), signal);
          if (externalWebStage.exit) {
            hideExternalWebPages();
            await wait(speed >= 12 ? 100 : Math.max(360, 900 / speed), signal);
          }
        } else if (gmailReceiptWritten) {
          showGmailReturnCue();
          await wait(speed >= 12 ? 1200 : Math.max(7600, 6400 / speed), signal);
          hideGmailWebPage();
          await wait(Math.max(1000, 4000 / speed), signal);
          hideGmailStage();
        } else if (gmailStage) {
          var gmailTiming = GMAIL_STAGES[gmailStage - 1];
          var gmailHold = gmailStageHoldMs(gmailTiming);
          await wait(Math.max(interval, gmailHold), signal);
        } else if (currentTask === "recruiting" && Number(event.seq) === 24) {
          var recoveryHold = speed >= 12 ? 1300 : 7600;
          showChapterCue({
            icon: "R",
            meta: "Trajectory · recovery checkpoint",
            title: "Two draft labels were corrected before final verification",
            operation: "reopen → validate → edit row 2 → edit row 4",
            body: "The validator first found only 3 duplicate flags, then found row 4 changed instead of preserved.",
            meaning: "The trajectory exposes both errors and both corrective edits; PASS still requires a clean rerun.",
            result: "2 corrections · revalidate next"
          }, recoveryHold);
          await wait(recoveryHold, signal);
          hideGmailStage();
        } else {
          await wait(chapterCue ? Math.min(260, interval) : interval, signal);
        }
        if (activeGmailStage && gmailReceiptWritten) {
          hideGmailStage();
        }
      }
      els.workSummary.classList.remove("is-working");
      hideExternalWebPages();
      els.workSummaryText.textContent = tr("Worked for ") + task.worked;
      await wait(Math.max(180, 520 / speed), signal);
      await streamAnswer(task, signal);
      addArtifacts(task);
      smoothScroll();
      if (currentTask === "recruiting") {
        var outcomeHold = speed >= 12 ? 1400 : 8000;
        showChapterCue({
          icon: "✓",
          meta: "Outcome · verified final state",
          title: "PASS with recovery—not a hidden first-draft success",
          operation: "validate 5 deliverables · cross-check source + Gmail receipt",
          body: "5 records preserved; 4 duplicate flags; 2 groups; Gmail send verified.",
          meaning: "Completion is backed by deterministic file checks and a verified Gmail send after both local corrections.",
          result: "PASS with recovery"
        }, outcomeHold);
        await wait(outcomeHold, signal);
        hideGmailStage();
        await wait(speed >= 12 ? 260 : 360, signal);
      } else {
        await presentChapterCue(task.outcome, "outcome", signal, false);
      }
      els.app.dataset.replayState = "complete";
      els.controlStatus.textContent = tr("Complete");
      window.__ACCIO_REPLAY_QA__.state = "complete";
      window.__ACCIO_REPLAY_QA__.renderedEvents = els.activity.querySelectorAll(".activity-row").length;
      window.__ACCIO_REPLAY_QA__.renderedArtifacts = els.artifacts.children.length;
      window.__ACCIO_REPLAY_QA__.gmailStageCount = asArray(window.__ACCIO_REPLAY_QA__.gmailStagesSeen).length;
      window.__ACCIO_REPLAY_QA__.gmailWebReadbackCount = asArray(window.__ACCIO_REPLAY_QA__.gmailWebReadbacksSeen).length;
      window.__ACCIO_REPLAY_QA__.gmailWebPageHiddenAtCompletion =
        !els.gmailWebPage.classList.contains("visible") &&
        els.gmailWebPage.getAttribute("aria-hidden") === "true";
      window.__ACCIO_REPLAY_QA__.externalWebPagesHiddenAtCompletion =
        !els.githubWebPage.classList.contains("visible") &&
        !els.hfWebPage.classList.contains("visible");
      window.__ACCIO_REPLAY_QA__.gmailReceiptPreview = els.previewTitle.textContent === "gmail_receipt.json" ||
        Boolean(els.previewBody.querySelector("[data-gmail-receipt='true']"));
      window.dispatchEvent(new CustomEvent("accio-replay-complete", { detail: { task: task.id } }));
    } catch (error) {
      if (error.name !== "AbortError") {
        els.app.dataset.replayState = "error";
        els.controlStatus.textContent = tr("Replay error");
        window.__ACCIO_REPLAY_QA__.state = "error";
        window.__ACCIO_REPLAY_QA__.error = String(error);
        throw error;
      }
    } finally {
      if (replayController === controller) replayController = null;
    }
  }

  function preferredMimeType() {
    return ["video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm"].find(function (type) {
      return window.MediaRecorder && MediaRecorder.isTypeSupported(type);
    }) || "";
  }

  async function recordReplay() {
    var task = TASKS[currentTask];
    if (!task.available) {
      els.controlStatus.textContent = tr("Validated data required");
      return;
    }
    if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia || !window.MediaRecorder) {
      els.controlStatus.textContent = "Recording unsupported";
      return;
    }
    try {
      els.controlStatus.textContent = "Choose this tab";
      recordingStream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: { ideal: 60, max: 60 }, width: { ideal: 1920 }, height: { ideal: 1080 } },
        audio: false,
        preferCurrentTab: true,
        selfBrowserSurface: "include",
        surfaceSwitching: "exclude"
      });
      recordedChunks = [];
      var mimeType = preferredMimeType();
      mediaRecorder = new MediaRecorder(recordingStream, Object.assign(mimeType ? { mimeType: mimeType } : {}, { videoBitsPerSecond: 18000000 }));
      mediaRecorder.addEventListener("dataavailable", function (event) {
        if (event.data && event.data.size) recordedChunks.push(event.data);
      });
      mediaRecorder.addEventListener("stop", function () {
        var blob = new Blob(recordedChunks, { type: mediaRecorder.mimeType || "video/webm" });
        var url = URL.createObjectURL(blob);
        var link = document.createElement("a");
        link.href = url;
        link.download = "accio-work-" + currentTask + "-occamy-1.0.webm";
        link.click();
        setTimeout(function () { URL.revokeObjectURL(url); }, 3000);
        if (recordingStream) recordingStream.getTracks().forEach(function (track) { track.stop(); });
        recordingStream = null;
        document.body.classList.remove("recording", "clean-mode");
        els.controlStatus.textContent = "Saved";
      });
      var track = recordingStream.getVideoTracks()[0];
      if (track) track.addEventListener("ended", function () {
        if (mediaRecorder && mediaRecorder.state === "recording") mediaRecorder.stop();
      });
      document.body.classList.add("recording", "clean-mode");
      mediaRecorder.start(1000);
      var stopAfterComplete = async function (event) {
        if (event.detail.task !== currentTask) return;
        window.removeEventListener("accio-replay-complete", stopAfterComplete);
        await wait(2200);
        if (mediaRecorder && mediaRecorder.state === "recording") mediaRecorder.stop();
      };
      window.addEventListener("accio-replay-complete", stopAfterComplete);
      await wait(650);
      runReplay();
    } catch (error) {
      document.body.classList.remove("recording", "clean-mode");
      if (recordingStream) recordingStream.getTracks().forEach(function (track) { track.stop(); });
      recordingStream = null;
      els.controlStatus.textContent = error.name === "NotAllowedError" ? "Recording cancelled" : "Recording failed";
    }
  }

  els.filesTab.addEventListener("click", function () { setPrimaryPane("files"); });
  els.artifactTab.addEventListener("click", function () { setPrimaryPane("artifact"); });
  els.renderedMode.addEventListener("click", function () { setPreviewMode("rendered"); });
  els.sourceMode.addEventListener("click", function () { setPreviewMode("source"); });
  els.wrapToggle.addEventListener("click", function () {
    previewWrapped = !previewWrapped;
    configurePreviewModes(artifactFor(TASKS[currentTask], activePreview));
  });
  Array.from(els.mobileViewSwitcher.querySelectorAll("button")).forEach(function (button) {
    button.addEventListener("click", function () { setMobileView(button.dataset.mobileView); });
  });
  els.taskPicker.addEventListener("change", function (event) { setTask(event.target.value); });
  els.speedPicker.addEventListener("change", function () {
    if (els.app.dataset.replayState === "running") runReplay();
  });
  els.play.addEventListener("click", runReplay);
  els.reset.addEventListener("click", resetReplay);
  els.record.addEventListener("click", recordReplay);
  document.addEventListener("keydown", function (event) {
    if (event.target.matches("select,button,input,textarea")) return;
    if (event.code === "Space") {
      event.preventDefault();
      runReplay();
    }
    if (event.key.toLowerCase() === "r") resetReplay();
  });

  var params = new URLSearchParams(location.search);
  currentTask = taskFromUrl();
  if (params.get("speed")) els.speedPicker.value = params.get("speed");
  if (params.get("clean") === "1") document.body.classList.add("clean-mode");
  setTask(currentTask, { updateHistory: false });
  if (params.get("autoplay") === "1") setTimeout(runReplay, 450);
})();
