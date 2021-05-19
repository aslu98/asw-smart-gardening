const Navbutton = {
    data: () => {
        return {
            count: 0
        }
    },
    template: `
        <li class="nav-item">
            <router-link class="nav-link" :to="{name : text}" @click="onClickButton()"> {{text}} {{count}} click</router-link>
        </li>
    `,
    props: ['text'],
    methods: {
        onClickButton(){
            this.count++;
            this.$emit('clicked');
        }
    }
}

const Navbar = {
    components:{
        'navbutton': Navbutton
    },
    data: () => {
        return {
            count: 0
        }
    },
    template: `
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div id="navbarNav">
                <ul class="navbar-nav">
                    <navbutton :text="Home" @clicked="onClickChild()"></navbutton>
                    <navbutton :text="Movies" @clicked="onClickChild()"></navbutton>
                </ul>
            </div>
            <p>Tot click: {{ count }}</p>
        </nav>
    `,
    methods: {
        onClickChild(){
            this.count++;
        }
    }}