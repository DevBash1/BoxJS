let children;

let total = new Box({
    el:"#total",
    data:{
        count: 0,
        color: "grey"
    },
    watch:{
        count:function(count){
            if(count >= 10){
                this.color = "lime";
            }else{
                this.color = "grey";
            }
        }
    },
    template:function(){
        return `
        <span b-style="{'background':'{{color}}','borderRadius':'100%'}" class="btn btn-secondary btn-sm m-2">{{count}}</span>
        `;
    }
})

function update(){
    let count = 0;
    children.forEach(function(each){
        count += each.count;
    })
    total.count = count;
}

new Box({
    el:"#reset",
    data:{
        cb:null,
    },
    start:function(){
        children = new Boxer(".counter",counter).render();
        this.cb = new Syncer(children);
    },
    methods:{
        reset:function(){
            this.cb.count = 0;
        }
    },
    template:function(){
        return `
        <button b-style="{'background':'green'}" class="btn btn-secondary btn-sm" b-on:click="reset">Reset</button>
        `
    }
});