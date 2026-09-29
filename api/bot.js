export default async function handler(req, res) {
  if (req.method!== 'POST') return res.status(200).send('OK');
  const BOT_TOKEN = process.env.BOT_TOKEN;
  const APP_URL = 'https://blunboz.vercel.app';

  const update = req.body;
  const msg = update.message;
  if (!msg ||!msg.text) return res.status(200).send('OK');

  const chatId = msg.chat.id;
  const text = msg.text;
  const name = msg.from.first_name || 'Friend';

  let replyText = '';
  if (text.startsWith('/start')) {
    const refId = text.split(' ')[1];
    if (refId && refId!= msg.from.id) {
      replyText = `✅ A referral has been confirmed — you were invited by a friend!\n\n🔥 Welcome ${name} to BLUNBOZ!\n💰 Earn $2/day watching ads`;
    } else {
      replyText = `🔥 Welcome to BLUNBOZ, ${name}!\n\n💰 Watch ads, refer friends and earn USDT\n\n✅ Join @blunbozearn $0.40\n📅 Daily $0.02\n▶️ Ads $0.10 x20 = $2/day\n👥 Referral $0.07 each\n\nTap OPEN below to start farming!`;
    }

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: replyText,
        reply_markup: {
          inline_keyboard: [[
            { text: '🚀 Open Blunboz', web_app: { url: APP_URL } }
          ]]
        }
      })
    });
  }
  return res.status(200).send('OK');
      }
