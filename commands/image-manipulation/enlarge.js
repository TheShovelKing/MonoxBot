const MonoxCommand = require('../../const/MonoxCommand.js');

class EnlargeCommand extends MonoxCommand {
	constructor(client) {
		super(client, {
			name: 'enlarge',
			aliases: [],
			group: 'image-manipulation',
			memberName: 'enlarge',
			description: 'Make your image bigger.',
			throttling: {
				usages: 1,
				duration: 5
			}
		})
	}

	async run(msg, argString) {
		if (msg.channel.type === 'dm') return msg.reply('Sorry, this command can\'t be use in DM Channel.')
		let args = this.utils.splitArgs(argString);
		let image = await this.utils.getImagesFromMessage(msg, args);
		
		if (image.length === 0) return msg.channel.send('```m!enlarge (user || @mentions || url link)\n\nMake your image bigger xD```');
		
		msg.channel.startTyping();
		this.gm(this.request(image[0]))
			.resize(1024, 1024)
			.toBuffer('PNG', function(err, buffer) {
				if (err) return msg.channel.send(':warning: ``Unable to send file. perhaps missing permission?``').then(msg.channel.stopTyping(true));
				msg.channel.send({files: [{name: 'scale.png', attachment: buffer}]});
			})
		msg.channel.stopTyping(true);
	}
}

module.exports = EnlargeCommand;