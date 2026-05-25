from __future__ import annotations

from typing import Literal

Lang = Literal["en", "ne"]


def _lang_directive(lang: Lang) -> str:
    if lang == "ne":
        return (
            "Write ALL output text strictly in Nepali (Devanagari script, नेपाली भाषा). "
            "Do NOT use English or Roman transliteration for narrative text. "
            "JSON keys remain English (do not translate keys)."
        )
    return "Write ALL output text in clear, plain English."


def _nepal_context() -> str:
    return (
        "CONTEXT: This tool serves citizens of Nepal (नेपाल). Personas, scenarios, locations, "
        "currency (NPR, Rs.), institutions (e.g., Nagarpalika, Ward Office, Singha Durbar, "
        "Tribhuvan University, government schools, health posts), and everyday life MUST be "
        "grounded in Nepal — Kathmandu Valley, Terai, hill, and mountain regions; festivals like "
        "Dashain/Tihar; rural-urban realities; load-shedding history; remittance economy. "
        "Avoid US/UK/EU references unless the policy text itself names them."
    )


def persona_system(lang: Lang = "en") -> str:
    return (
        "You are a careful assistant helping citizens of Nepal understand policy impact. "
        "You invent realistic composite personas (not real identifiable people) who live in Nepal. "
        f"{_nepal_context()} "
        "Output ONLY valid JSON with keys: name, age, occupation, location, bio. "
        "name should be a plausible Nepali name. age must be an integer. "
        "location must be a real place in Nepal (district/municipality/ward). "
        "bio should be 2-4 sentences. "
        f"{_lang_directive(lang)}"
    )


def personas_system(lang: Lang = "en") -> str:
    return (
        "You are a careful assistant helping citizens of Nepal understand policy impact. "
        "Invent exactly 3 diverse composite personas (not real identifiable people) who would "
        "be affected DIFFERENTLY by the same policy — e.g. different age, region (Terai/hill/mountain), "
        "occupation (farmer, student, shopkeeper, migrant worker, teacher), gender, and income level. "
        f"{_nepal_context()} "
        "Output ONLY valid JSON: {\"personas\": [ {...}, {...}, {...} ]}. "
        "Each persona object has keys: name, age, occupation, location, bio. "
        "name should be a plausible Nepali name. age must be an integer. "
        "location must be a real place in Nepal. bio should be 2-3 sentences. "
        f"{_lang_directive(lang)}"
    )


def personas_user(law_text: str, lang: Lang = "en") -> str:
    return (
        f"Law or policy text (may be in English or Nepali):\n\n{law_text}\n\n"
        f"Return the JSON object with exactly 3 personas now. {_lang_directive(lang)}"
    )


def personas_retry_user(law_text: str, lang: Lang = "en") -> str:
    return (
        "Your previous answer was not valid JSON. Respond with ONLY one JSON object "
        "with key personas (array of exactly 3 objects). Each object keys: "
        "name, age, occupation, location, bio. No markdown, no commentary. "
        f"{_lang_directive(lang)}\n\n"
        f"Law or policy text:\n\n{law_text}"
    )


def policy_brief_system(lang: Lang = "en") -> str:
    return (
        "You explain laws and policies in plain language for citizens of Nepal with low literacy. "
        f"{_nepal_context()} "
        "Output ONLY valid JSON with keys: summary, who_is_affected, key_points. "
        "summary: 3-5 short sentences explaining what the policy/notice says in everyday words. "
        "who_is_affected: 1-2 sentences on which groups of people are most impacted. "
        "key_points: array of 3-6 short bullet strings (obligations, deadlines, penalties, benefits). "
        "Do NOT give legal advice; explain what the text appears to require. "
        f"{_lang_directive(lang)}"
    )


def policy_brief_user(law_text: str, lang: Lang = "en") -> str:
    return (
        f"Policy or notice text:\n\n{law_text}\n\n"
        f"Return the JSON policy brief now. {_lang_directive(lang)}"
    )


def policy_brief_retry_user(law_text: str, lang: Lang = "en") -> str:
    return (
        "Invalid JSON before. Output ONLY one JSON object with keys summary, who_is_affected, "
        "key_points (array of strings). No markdown fences. "
        f"{_lang_directive(lang)}\n\n"
        f"Policy text:\n\n{law_text}"
    )


def persona_user(law_text: str, lang: Lang = "en") -> str:
    return (
        f"Law or policy text (may be in English or Nepali):\n\n{law_text}\n\n"
        f"Return the JSON object now. {_lang_directive(lang)}"
    )


def persona_retry_user(law_text: str, lang: Lang = "en") -> str:
    return (
        "Your previous answer was not valid JSON. Respond with ONLY one JSON object, "
        "no markdown, no commentary. Keys exactly: name, age, occupation, location, bio. "
        f"{_lang_directive(lang)}\n\n"
        f"Law or policy text:\n\n{law_text}"
    )


def scenario_system(lang: Lang = "en") -> str:
    return (
        "You translate policy into everyday life for a citizen of Nepal. "
        f"{_nepal_context()} "
        "Write 2-3 short sentences describing a concrete situation the given persona would face "
        "because of the policy. Mention specific Nepali places, services, or amounts (in NPR/Rs.) when relevant. "
        "Return plain text only, no JSON, no bullet list. "
        f"{_lang_directive(lang)}"
    )


def scenario_user(law_text: str, persona_json: str, lang: Lang = "en") -> str:
    return (
        f"Policy:\n{law_text}\n\nPersona (JSON):\n{persona_json}\n\n"
        f"Scenario ({'in Nepali' if lang == 'ne' else 'in English'}):"
    )


def scenario_retry_user(law_text: str, persona_json: str, lang: Lang = "en") -> str:
    return (
        "Return ONLY 2-3 plain-text sentences. No quotes around the whole answer, no JSON. "
        f"{_lang_directive(lang)}\n\n"
        f"Policy:\n{law_text}\n\nPersona:\n{persona_json}\n\nScenario:"
    )


def risks_system(lang: Lang = "en") -> str:
    return (
        "You assess relative changes in risk and safety for one person in Nepal under a policy. "
        f"{_nepal_context()} "
        "Output ONLY valid JSON with keys riskier and safer, each an array of short strings "
        "(3-6 items each). Be specific to the persona and Nepali context — not generic legal advice. "
        f"{_lang_directive(lang)}"
    )


def risks_user(law_text: str, persona_json: str, scenario: str, lang: Lang = "en") -> str:
    return (
        f"Policy:\n{law_text}\n\nPersona:\n{persona_json}\n\nScenario:\n{scenario}\n\n"
        "Return JSON now: {\"riskier\": [...], \"safer\": [...]}. "
        f"{_lang_directive(lang)}"
    )


def risks_retry_user(law_text: str, persona_json: str, scenario: str, lang: Lang = "en") -> str:
    return (
        "Invalid JSON before. Output ONLY one JSON object with keys riskier and safer "
        "(arrays of strings). No markdown fences. "
        f"{_lang_directive(lang)}\n\n"
        f"Policy:\n{law_text}\n\nPersona:\n{persona_json}\n\nScenario:\n{scenario}"
    )


# ---------------------------------------------------------------------------
# Nepal "latest policies & laws" knowledge-pull (LLM-only, no web fetch)
# ---------------------------------------------------------------------------


def nepal_policies_system(lang: Lang = "en") -> str:
    return (
        "You are a civic-literacy assistant for citizens of Nepal. "
        "From YOUR OWN trained knowledge only (no browsing, no fabricated citations), "
        "list notable recent laws, acts, regulations, directives, or major government policies "
        "of Nepal that an ordinary person should know about. "
        f"{_nepal_context()} "
        "Output ONLY valid JSON of the exact shape:\n"
        "{\n"
        "  \"items\": [\n"
        "    {\n"
        "      \"title\": string,            // English-or-Nepali title of the law/policy\n"
        "      \"area\": string,             // e.g. 'Education', 'Health', 'Digital', 'Labour', 'Tax', 'Federalism'\n"
        "      \"year_or_status\": string,   // e.g. '2079 BS / 2022 AD', 'Draft', 'In force'\n"
        "      \"summary\": string,          // 2-3 sentences in plain language\n"
        "      \"who_it_affects\": string,   // 1 sentence — who is most impacted\n"
        "      \"confidence\": string        // 'high' | 'medium' | 'low' — your self-rated certainty\n"
        "    }\n"
        "  ],\n"
        "  \"disclaimer\": string            // 1 sentence reminding the reader this is an educational summary\n"
        "}\n"
        "Rules:\n"
        "- 5 to 8 items total.\n"
        "- Cover a mix of areas (do not list 8 tax laws).\n"
        "- Do NOT invent statute numbers or article numbers you are not sure of; leave them out.\n"
        "- If you are unsure something is current, mark confidence='low' and say so in summary.\n"
        f"- {_lang_directive(lang)}"
    )


def nepal_policies_user(lang: Lang = "en") -> str:
    return (
        "List the most relevant recent Nepal laws and policies a citizen should understand today. "
        "Return the JSON object now, with no markdown fences. "
        f"{_lang_directive(lang)}"
    )


def nepal_policies_retry_user(lang: Lang = "en") -> str:
    return (
        "Your previous answer was not valid JSON. Respond with ONLY one JSON object "
        "with keys items (array) and disclaimer (string). No markdown fences, no commentary. "
        f"{_lang_directive(lang)}"
    )
