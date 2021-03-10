let handler = async m => m.reply(`
╭─「 Donasi • Dana 」
│ • Dana [0895421208044]
╰────
`.trim()) // Tambah sendiri kalo mau
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^dona(te|si)$/i

module.exports = handler
