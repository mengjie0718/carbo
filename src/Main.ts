//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private bg: BackgroundView;
    private home: HomeView;
    private farm: FarmView;
    private farmList:FarmListView;
    private members: FarmMemberListView;
    private menuView:MenuView;
    private marketplace:Marketplace;
    private web3: any;
    private instance: any;

    private onAddToStage(event: egret.Event) {
        GameConst.SCENT_WIDTH = this.stage.stageWidth;
        GameConst.SCENT_HEIGHT = this.stage.stageHeight;
        GameConst.GamePoxX = 0;

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }
        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        this.runGame().catch(e => {
            console.log(e);
        })

    }

    private async runGame() {
        await this.loadResource();
        await this.loadTheme();
        this.createGameScene();
    }

    // load resource
    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);

            
        }
        catch (e) {
            console.error(e);
        }
    }

    // load theme
    private async loadTheme() {
        try {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
        }
        catch (e) {
            console.error(e);
        }
    }

    /**
     * 显示主页
     * show home view
     */
    public showHome() {
        this.removeChildren();
        this.addChild(this.bg);
        this.addChild(this.home);
        GameConst.GamePoxX = 0;
        this.bg.movebg();
        this.addMenu();
    }

    /**
     * 显示农场
     * show farm view
     */
    public showFarm() {
        this.removeChildren();
        this.addChild(this.bg);
        this.addChild(this.farm);
        GameConst.GamePoxX = 2000;
        this.addChild(this.members);
        this.bg.movebg();
        this.addMenu();
    }

    public showAccount() {
        this.removeChildren();
        this.addChild(this.bg);
        this.addMenu();
    }

    public showFarmList(){
        this.removeChildren();
        if(this.farmList==null){
            this.farmList = new FarmListView();
        }
       
        GameConst.GamePoxX = 1800;
        this.addChild(this.bg);
        this.bg.movebg();
        this.addChild(this.farmList);
        this.addMenu();
    }

    public showMarket(){
        this.removeChildren();
        if(this.marketplace==null){
            this.marketplace = new Marketplace();
        }
       
        GameConst.GamePoxX = 1800;
        this.addChild(this.bg);
        this.bg.movebg();
        this.addChild(this.marketplace);
        this.addMenu();
    }
    /**
     * 显示菜单
     * show menu
     */
    private addMenu() {
        if(this.menuView==null){
            this.menuView = new MenuView(this);
            this.menuView.x = 0;
            this.menuView.y = 0;
        }
        if(!this.menuView.parent){
            this.addChild(this.menuView);
        }
        
        // const farmButton = new egret.Sprite();
        // this.addChild(farmButton);
        // const button1:egret.Bitmap = this.createBitmapByName("icon_farmlist_png");
        // farmButton.addChild(button1);
        // farmButton.touchEnabled = true;
        // farmButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.showFarm,this);

        // const homeButton = new egret.Sprite();
        // this.addChild(homeButton);
        // homeButton.x = 100;
        // const button2:egret.Bitmap = this.createBitmapByName("icon_milkbottle_png");
        // homeButton.addChild(button2);
        // homeButton.touchEnabled = true;
        // homeButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.showHome,this);

        // const accountButton = new egret.Sprite();
        // this.addChild(accountButton);
        // accountButton.x = 200;
        // //TODO: change icon asset
        // const button3:egret.Bitmap = this.createBitmapByName("icon_profile_png");
        // accountButton.addChild(button3);
        // accountButton.touchEnabled = true;
        // accountButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.showAccount,this);
        
        // let farmListbtn = new egret.Sprite();
        // farmListbtn.x = 300;
        // farmListbtn.addChild(this.createBitmapByName("icon_profile_png"));
        // farmListbtn.touchEnabled = true;
        // farmListbtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.showFarmList,this);
        // this.addChild(farmListbtn);
    }

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        console.log("cabo createGameScene()");
        this.getWeb3Instance(); 
        this.bg = new BackgroundView();
        this.home = new HomeView(this.web3);
        this.farm = new FarmView();
        this.members = new FarmMemberListView();
        this.showHome();
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

    private getWeb3Instance() {
        var web3Provider;
        if (typeof window['web3'] !== 'undefined') {
            console.log("nice web3Provider set");
            web3Provider = window['web3'].currentProvider;
            this.web3  = new window["Web3"](web3Provider);
            let web3 = this.web3;
            web3.eth.defaultAccount = web3.eth.accounts[0];
            const address = "0x5a16ef04f793a5f1878ae451bae06592515bd3c3";
            console.log(`defaultAcct: ${web3.eth.defaultAccount}`);
            console.log(this.instance);
        } else {
            console.log("web3 provider not found!");
        }
    }

}
