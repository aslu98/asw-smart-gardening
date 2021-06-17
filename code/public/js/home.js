const Home = {
    components: {
        'Gardeinfo': GardenInfo
    },
    template: `
        <div id="mapid">
            <div id="garden-info-sidebar" class="leaflet-sidebar">
              <Gardeinfo :gardenid="selectedGarden" @hidesidebar="closeSidebar"></Gardeinfo>
            </div>
        </div>
    `,
    data() {
        return {
            gardens: [],
            map: [],
            sidebar: [],
            showGardenDetails: false,
            selectedGarden: ""
        }
    },
    methods: {
        init() {
            this.createMap();
            this.getAllGardens();
        },
        getAllGardens() {
            axios
                .get("http://localhost:3000/api/gardens/")
                .then(response => {
                    this.gardens = response.data;
                    this.setGardensPointer();
                })
                .catch(error => (console.log(error)));
        },
        createMap() {
            this.map = L.map('mapid').setView([44.107, 12.385], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
                maxZoom: 18
            }).addTo(this.map);
            this.createSidebar();
        },
        setGardensPointer() {
            this.gardens.forEach(g => {
                let gardenIcon = L.icon({
                    iconUrl: g.flagsOn > 1 ? '/static/img/icon-red.png' : g.flagsOn > 0 ? '/static/img/icon-orange.png' : '/static/img/icon-green.png',
                    shadowUrl: '/static/img/icon-shadow.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41],
                    shadowAnchor: [12, 41]
                });

                L.marker([g.lat, g.lon], {
                    icon: gardenIcon,
                    title: g.name})
                    .addTo(this.map)
                    .on('click', e => {
                        this.openSidebar(g._id);
                    });
            });
        },
        createSidebar() {
            this.sidebar = L.control.sidebar('garden-info-sidebar', {
                closeButton: false,
                autopan: true,
                position: 'right'
            }).addTo(this.map);
            this.map.on('click', e => {
                if(this.showGardenDetails){
                    this.closeSidebar();
                }
            })
        },
        setShowGardenDetails(state) {
            this.showGardenDetails = state;
        },
        closeSidebar() {
            this.sidebar.hide();
            this.setShowGardenDetails(false);
            this.selectedGarden = "";
        },
        openSidebar(gardenId) {
            if(this.selectedGarden !== gardenId){
                this.sidebar.show();
                this.setShowGardenDetails(true);
                this.selectedGarden = gardenId;
            }
        }
    },
    mounted() {
        this.init();
    }
}