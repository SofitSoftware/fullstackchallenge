import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class VehicleFormComponent extends Component {
    @service router;
    @tracked plate = null;
    @tracked brand = null;
    @tracked model = null;
    @tracked version = null;
    @tracked year = null;
    @tracked chassi = null;
    @tracked imageUrl = null;
    @tracked colorId = null;
    @tracked error = {};
    @tracked colors = [];
    @tracked type = null;
    @tracked models = []
    @tracked brands = [];


    constructor() {
        super(...arguments);
        this.findColors();
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
    }

    @action
    async changeBrand(brand) {
        this.brand = brand;
        const response = await fetch(`https://parallelum.com.br/fipe/api/v1/${this.type}/marcas/${brand}/modelos`, {
            method: 'GET',
        })
        this.models = (await response.json()).modelos
    }
    
    @action
    changeModel(model) {
        this.model = model;
    }

    @action
    async submit(event) {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:3333/vehicle`, {
                method: 'POST',
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

            if(response.status === 204) {
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
