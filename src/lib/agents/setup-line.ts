// Pure MCP setup text: command/configuration bytes are never translated.
export type AgentProgram = "claude" | "codex" | "opencode" | "other";

export const AGENT_PROGRAMS: Array<{ value: AgentProgram; label: string }> = [
  { value: "claude", label: "Claude Code" },
  { value: "codex", label: "Codex" },
  { value: "opencode", label: "opencode" },
  { value: "other", label: "Other" },
];

type Line = { text: string; block: boolean; where: string };

export function agentSetupLine(program: AgentProgram, url: string, token: string): Line {
  if (program === "claude") {
    return {
      text: `claude mcp add --transport http odm ${url} --header "Authorization: Bearer ${token}"`,
      block: false,
      where: "Run it once in a terminal on the computer where Claude Code is installed.",
    };
  }
  if (program === "codex") {
    return {
      text: `[mcp_servers.odm]\nurl = "${url}"\nhttp_headers = { Authorization = "Bearer ${token}" }`,
      block: true,
      where: "Add it to ~/.codex/config.toml (create the file if it is not there), then start Codex again.",
    };
  }
  if (program === "opencode") {
    return {
      text: `"mcp": { "servers": { "odm": { "type": "remote", "url": "${url}", "headers": { "Authorization": "Bearer ${token}" }, "oauth": false } } }`,
      block: false,
      where: "For opencode 2, add it inside opencode.json (in the project, or ~/.config/opencode/opencode.json), then start opencode again.",
    };
  }
  return {
    text: `${url}  ·  Authorization: Bearer ${token}`,
    block: false,
    where: "Any MCP client that speaks streamable HTTP: give it this address and this header.",
  };
}
