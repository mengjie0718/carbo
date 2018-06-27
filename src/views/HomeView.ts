/**
 * Created by SPC
 * Home view
 */
class HomeView extends egret.Sprite {
	public constructor() {
		super();
		this.initView();
	}
    private initView() {
		const label = new egret.TextField(); 
		label.text = "Welcome to CoinCow"; 
		label.textColor = 0xFFFFFF;
        label.size = 100;
		this.addChild(label);
		label.x = GameConst.SCENT_WIDTH / 2 - 300;
		label.y = GameConst.SCENT_HEIGHT / 2 - 200;
        // add button
        var button = new eui.Button();
        button.width = 200;
        button.height = 50;
        button.x = GameConst.SCENT_WIDTH / 2 - 100;
        button.y = GameConst.SCENT_HEIGHT / 2 + 100;
        button.label = "Start Mooring";
        this.addChild(button);
        button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.showSignUpModal,this);
    }

    private showSignUpModal() {
        console.log("click");
        const modal = new SignUpModal();
        modal.x = GameConst.SCENT_WIDTH / 2 - 570;
        modal.y = GameConst.SCENT_HEIGHT / 2 - 270;
        this.addChild(modal);
    }

	/**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}
