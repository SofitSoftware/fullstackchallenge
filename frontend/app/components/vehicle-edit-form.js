import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class VehicleEditFormComponent extends Component {
    @service router;

    @tracked plate = '';
    @tracked brand = '';
    @tracked model = '';
    @tracked version = '';
    @tracked year = '';
    @tracked chassi = '';
    @tracked imageUrl = '';
    @tracked colorId = '';
    @tracked error = {};
    @tracked colors = [];
    @tracked type = '';
    @tracked models = []
    @tracked brands = [];


    constructor() {
        super(...arguments);
        this.findColors();
        this.findOneVehicle();
    }

    async findOneVehicle() {
        const response = await fetch(`http://localhost:3333/vehicle/${this.router.currentRoute.attributes}`, {
            method: 'GET',
        });

        const data = await response.json();
        console.log(data);
        this.plate = data.plate;
        this.type = data.type;
        this.version = data.version;
        this.colorId = data.color.id;
        this.chassi = data.chassi;
        await this.changeType(data.type);
        await this.changeBrand(data.brand);
        this.model = Number(data.model);
        this.brand = Number(data.brand);
        this.year = data.year;
    }

    async findColors() {
        const response = await fetch(`http://localhost:3333/colors`, {
            method: 'GET',
        });

        this.colors = await response.json();
    }

    @action 
    changeColor(color) {
        this.colorId = color
    }

    @action
    async changeType(type) {
        this.type = type;

        const response = await fetch(`https://parallelum.com.br/fipe/api/v1/${type}/marcas`, {
            method: 'GET',
        })
        this.brands = await response.json()
        return ;
    }

    @action
    async changeBrand(brand) {
        this.brand = brand;
        const response = await fetch(`https://parallelum.com.br/fipe/api/v1/${this.type}/marcas/${brand}/modelos`, {
            method: 'GET',
        })
        this.models = (await response.json()).modelos

        return ;
    }
    
    @action
    changeModel(model) {
        this.model = model;
    }

    @action
    async submit(event) {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:3333/vehicle/${this.router.currentRoute.attributes}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    plate: this.plate,
                    brand: this.brand, 
                    model: this.model, 
                    version: this.version, 
                    year: this.year,
                    chassi: this.chassi,
                    colorId: this.colorId,
                    type: this.type,
                })
            });

            if(response.status === 200) {
                this.router.transitionTo('/vehicles'); 
            }else {
                const data = await response.json()
                const errors = {};
                data.errors.forEach(({ fieldName, message }) => errors[fieldName] = message);
                this.error = errors
            }
        } catch(err) {
            console.log(err);
        }  
    }
}
