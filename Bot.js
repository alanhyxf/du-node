 /**
  * @file js-sdk bot demo
  * @author yelvye@baidu.com
  */
const Bot = require('bot-sdk');

 
const welcomeStr = '欢迎使用对诗李白，我会随机选择一句李白的诗，你来对下句。现在跟我说开始对诗吧！';
const helpStr = '抱歉我没有理解你的意思。说开始对诗开始吧。';
const defaultBkg = 'http://dbp-resource.gz.bcebos.com/92bb7de1-5d92-dab4-9c39-84c1998470a3/default.jpg?authorization=bce-auth-v1%2Fa4d81bbd930c41e6857b989362415714%2F2018-10-17T14%3A47%3A46Z%2F-1%2F%2Fcf2a0f8ff98250a2a00e592bb42b5f1d2d001e6ff96e24320548e5932615d0b0';
const titleStr = '对诗李白';





class InquiryBot extends Bot {
    constructor(postData) {
        super(postData);

        this.addLaunchHandler(() => {
            this.waitAnswer();
            return {
                directives: [this.getTemplate1(titleStr,welcomeStr,defaultBkg)],
                outputSpeech: welcomeStr
            };
        });

        this.addSessionEndedHandler(() => {
            this.endSession();
            return {
                outputSpeech: '多谢使用!'
            };
        });

        this.addIntentHandler('poem1', () => {
            this.waitAnswer();
            if(!this.request.isDialogStateCompleted()) {
                return this.nlu.setDelegate();
            }

            let next = this.getSlot('1-1');

		        console.log(next);

            let responseStr = `你是说下句${next}`;

            return {
                directives: [this.getTemplate1(titleStr,responseStr,defaultBkg)],
                outputSpeech: responseStr
            };
        });

         this.addIntentHandler('ai.dueros.common.default_intent', () => {
            this.waitAnswer();
            console.log(this.request)
            return {
                directives: [this.getTemplate1(titleStr,helpStr,defaultBkg)],
                outputSpeech: helpStr
            };
        });
    }

    getTemplate1(title,text,url) {
        let bodyTemplate = new Bot.Directive.Display.Template.BodyTemplate1();
        bodyTemplate.setPlainTextContent(text);
        bodyTemplate.setTitle(title);
        bodyTemplate.setBackGroundImage(url);
        let renderTemplate = new Bot.Directive.Display.RenderTemplate(bodyTemplate);
        return renderTemplate;
    }
}


module.exports = InquiryBot;
