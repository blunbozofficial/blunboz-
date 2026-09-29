export default async function handler(req, res) {
  const { user_id } = req.query;
  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHANNEL = process.env.CHANNEL_ID || "@blunbozearn";
  if (!user_id) return res.status(400).json({ ok: false, msg: "No user_id" });
  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getChatMember?chat_id=${CHANNEL}&user_id=${user_id}`);
    const data = await tgRes.json();
    if (!data.ok) return res.json({ ok: false, joined: false, error: data.description });
    const status = data.result.status;
    const joined = ["creator","administrator","member"].includes(status);
    return res.json({ ok: true, joined, status });
  } catch (e) {
    return res.status(500).json({ ok: false, joined: false, error: e.message });
  }
    }
