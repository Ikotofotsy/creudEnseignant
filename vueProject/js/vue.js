
new Vue({
    el:'#app',

    data:{
        num:'',
        nom:'',
        nbH:0,
        tauxH:0,
        enseignants:[],
        modife: false,
        salaire_min:0,
        salaire_max:0,
        salaire_total:0,
        message: "",
        cls:""
    },

    mounted(){
        this.getEnseignants();
        this.getSalaireMin();
        this.getSalaireMax();
        this.getSalaireTotal();
    },

    methods:
    {
        getSalaireMin : function()
        {
            axios
            .get("database/get-salaire-min.php")
            .then(res =>{
                //console.log(res.data);
                this.salaire_min = res.data[0].nbH * res.data[0].tauxH;
            })
        },
        getSalaireMax : function()
        {
            axios
            .get("database/get-salaire-max.php")
            .then(res =>{
                //console.log(res.data);
                this.salaire_max = res.data[0].nbH * res.data[0].tauxH;
            })
        },
        getSalaireTotal : function()
        {
            axios
            .get("database/get-salaire-total.php")
            .then(res =>{
                //console.log(res.data);
                this.salaire_total = res.data[0].total;
            })
        },
        getEnseignants : function()
        {
            axios
            .get("database/data-api.php")
            .then(res =>{
                //console.log(res.data);
                this.enseignants = res.data;
            })

        },
        
        resetForm : function()
        {
            this.num='';
            this.nom='';
            this.nbH=0;
            this.tauxH=0;
        },

        createEnseignants : function()
        {
            console.log("Add click");
            var enseignants = {
                //numEns: this.num,
                nom: this.nom,
                nbH: parseInt(this.nbH),
                tauxH: parseFloat(this.tauxH)
            };
            if(enseignants.nom=="")
            {
                this.message="Veuillez remplire les champs !";
                this.cls="alert alert-warning";
            }else{
                axios.post("database/post-data.php", enseignants)
            .then(response => 
            {
                //console.log(response.data);
                this.getEnseignants();
                this.getSalaireMin();
                this.getSalaireMax();
                this.getSalaireTotal();
                this.resetForm();
                this.message = "Ajout réussi !";
                this.cls="alert alert-success";
            })
            .catch(function (response) {
                //handle error
                //console.log(response)
            })
            }

            
        },

        showPrompt : function(id,nom,nbH,tauxH){
            //console.log("Edit:"+id);
            this.num = id;
            this.nom = nom;
            this.nbH = nbH;
            this.tauxH = tauxH;
            this.modife = true;
            
        },

        editEnseignants : function()
        {
            var enseignants = {
                numEns: this.num,
                nom: this.nom,
                nbH: parseInt(this.nbH),
                tauxH: parseFloat(this.tauxH)
            };

            if(enseignants.numEns=="" && enseignants.nom=="")
            {
                this.message="Veuillez remplire les champs !";
                this.cls="alert alert-warning";
            }else{

            axios.post("database/edit-data.php", enseignants)
            .then(response => 
            {
                this.getEnseignants();
                this.getSalaireMin();
                this.getSalaireMax();
                this.getSalaireTotal();
                this.resetForm()
                this.modife = false;
                this.message = "Modification réussi !";
                this.cls="alert alert-success";
            })
            .catch(function (response) {
                //handle error
                console.log(response)
            })}
        },
        deleteEnseignants : function(id){
           // console.log("Delete:"+id);
            if (window.confirm("Voulez-vous continuer la suppression ?")) {
                axios.post("database/delete-data.php", {numEns:id})
                .then(response => 
                {
                    this.getEnseignants();
                    this.getSalaireMin();
                    this.getSalaireMax();
                    this.getSalaireTotal();
                    this.message = "Suppression réussi !";
                    this.cls="alert alert-success";
                })
                .catch(function (response) {
                    //handle error
                    console.log(response)
                })
            } else {
                txt = "You pressed Cancel!";
            } 
            
        }
        
    }


})