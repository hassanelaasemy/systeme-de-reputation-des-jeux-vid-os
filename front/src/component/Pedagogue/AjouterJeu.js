import React, {useEffect, useState} from 'react';
import NavbarPedagogue from "./NavbarPedagogue";
import axios from "axios";

function AjouterJeu(props) {
    const [inputs, setInputs] = useState({
        'nom_jeu': '',
        'developpeur': '',
        'description': '',
        'mots_cles': '',
        'senario': '',
        'indications': '',
        'id': localStorage.getItem('id'),
        'id_platform': '',
        'id_categorie': ''
    });
    const [image, setImage] = useState([]);
    const [platform, setPlatform] = useState([]);
    const [categorie, setCategorie] = useState([]);
    const [error, setError] = useState({});

    const handelChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs({...inputs, [name]: value})
    }

    const handelSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image.image);
        formData.append('nom_jeu', inputs.nom_jeu);
        formData.append('developpeur', inputs.developpeur);
        formData.append('description', inputs.description);
        formData.append('mots_cles', inputs.mots_cles);
        formData.append('senario', inputs.senario);
        formData.append('indications', inputs.indications);
        formData.append('id', inputs.id);
        formData.append('id_platform', inputs.id_platform);
        formData.append('id_categorie', inputs.id_categorie);

        axios.post(`http://127.0.0.1:8000/api/jeux`, formData)
            .then((res) => {
                window.location.href = '/pedagogue/listeJeux'
            })
            .catch((err) => {
                // console.log(err.response.data.errors)
                setError(err.response.data.errors)
            })
    }

    // get platform
    const fetchPlatform = async () => {
        const response = await axios.get(`http://127.0.0.1:8000/api/platform`)
        setPlatform(response.data.data)
    }
    const fetchCategorie=async ()=>{
        const response=await axios.get(`http://127.0.0.1:8000/api/categorie`)
        setCategorie(response.data.data)
    }
    useEffect(() => {
        fetchPlatform()
        fetchCategorie()
    }, [])
    return (<>
        <NavbarPedagogue/>
        <div className={'container-fluid'}>
            <h3>Ajouter Jeu page</h3>
            <form className={'row g-3'} onSubmit={handelSubmit}>
                <div className="col-md-3">
                    <label className="form-label">Nom de jeu</label>
                    <input type="text" className="form-control" name={'nom_jeu'} onChange={handelChange}/>
                    <span className={'text-danger'}>{error.nom_jeu}</span>
                </div>
                <div className="col-md-3">
                    <label className="form-label">Categorie</label>
                    <select className="form-control" value={inputs.id_categorie} name="id_categorie"
                            onChange={handelChange}>
                        <option >Choisir categorie</option>
                        {categorie.map((ele) => (<option value={ele.id_categorie} key={ele.id_categorie}>{ele.categorie}</option>))}
                    </select>
                    <span className={'text-danger'}>{error.id_categorie}</span>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Platform</label>
                    <select className="form-control" value={inputs.id_platform} name="id_platform"
                            onChange={handelChange}>
                        <option disabled value={''}>Choisir platform</option>
                        {platform.map((ele) => (<option value={ele.id_platform} key={ele.id_platform}>{ele.platform}</option>))}
                    </select>
                    <span className={'text-danger'}>{error.id_platform}</span>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Developpeur</label>
                    <input type="text" className="form-control" name={'developpeur'} onChange={handelChange}/>
                    <span className={'text-danger'}>{error.developpeur}</span>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Image</label>
                    <input type="file" className="form-control" name={'image'} onChange={(e) => setImage({image: e.target.files[0]})}/>
                    <span className={'text-danger'}>{error.image}</span>
                </div>
                <div className="col-md-12">
                    <label className="form-label">Description</label>
                    <textarea className={'form-control'} onChange={handelChange} name={'description'}></textarea>
                    <span className={'text-danger'}>{error.description}</span>
                </div>
                <div className="col-md-12">
                    <label className="form-label">Mot cles</label>
                    <textarea className={'form-control'} onChange={handelChange} name={'mots_cles'}></textarea>
                    <span className={'text-danger'}>{error.mots_cles}</span>
                </div>
                <div className="col-md-12">
                    <label className="form-label">Senario</label>
                    <textarea className={'form-control'} onChange={handelChange} name={'senario'}></textarea>
                    <span className={'text-danger'}>{error.senario}</span>
                </div>
                <div className="col-md-12">
                    <label className="form-label">Indications</label>
                    <textarea className={'form-control'} onChange={handelChange} name={'indications'}></textarea>
                    <span className={'text-danger'}>{error.indications}</span>
                </div>

                <button type="submit" className="btn btn-primary">Ajouter</button>
            </form>
        </div>
    </>);
}

export default AjouterJeu;