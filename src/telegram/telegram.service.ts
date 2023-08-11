import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Markup, Telegraf } from 'telegraf';
import { MyBotName } from './telegram.constants';
import { InjectModel } from '@nestjs/sequelize';
import { Telegram } from './models/telegram.model';

@Injectable()
export class TelegramService {
  constructor(
    @InjectBot(MyBotName) private readonly bot: Telegraf<Context>,
    @InjectModel(Telegram) private telegramRepository: typeof Telegram,
  ) {}

  async onStart(ctx: Context) {
    const user = await this.telegramRepository.findOne({
      where: { user_id: `${ctx.from.id}` },
    });
    await ctx.reply(
      `<b><i>👋 Assalomu alaykum</i> botga xush kelibsiz 😊. </b>\n`,
      { parse_mode: 'HTML' },
    );
    if (user && user.is_active) {
      await ctx.reply('🏠 Bosh menu', {
        parse_mode: 'HTML',
        ...Markup.keyboard([
          ['👨‍🔧 Xizmat turini tanlash', '📙 Biz xaqimizda'],
          ['📞 Aloqa', '✍️ Prays'],
          ['🗑 Savatcha', '🤝 Hamkorlar'],
          ["💳 To'lov", '⚙️ Sozlamalar'],
        ])
          .resize()
          .oneTime(),
      });
    } else {
      await this.telegramRepository.create({
        user_id: `${ctx.from.id}`,
        first_name: `${ctx.from.first_name}`,
        last_name: `${ctx.from.last_name}`,
        username: `${ctx.from.username}`,
        state: 'name',
      });
    }
  }
}
