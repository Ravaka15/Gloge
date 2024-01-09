import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
export default function ViewUser() {
    const [user,setUser]=useState({
        name:"",
        username:"",
        datenaissance:"",
        sexe:"",
        adresse:"",
        tel:"",
        email:"",
        type:"",
        password:"",
    });

    const {id}=useParams();

    useEffect(()=>{
        loadUser();
    },[]);

    const loadUser=async ()=>{
        const result=await axios.get(`http://localhost:8080/user/${id}`)
        setUser(result.data);
    }
  return (
    <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                <h2 className="text-center m-4">Detail User</h2>
                
                <div className='card'>
                    <div className='card-header'>
                        Detail pour le patient id:
                        <ul className='list-group list-group-flush'>
                            <li className='list-group-item'>
                                <b>Nom:</b>
                                {user.name}
                            </li>
                            <li className='list-group-item'>
                                <b>Prenom:</b>
                                {user.username}
                            </li>
                            <li className='list-group-item'>
                                <b>Date de naissance:</b>
                                {user.datenaissance}
                            </li>
                            <li className='list-group-item'>
                                <b>Sexe:</b>
                                {user.sexe}
                            </li>
                            <li className='list-group-item'>
                                <b>Adresse:</b>
                                {user.adresse}
                            </li>
                            <li className='list-group-item'>
                                <b>Telephone:</b>
                                {user.tel}
                            </li>
                            <li className='list-group-item'>
                                <b>E-mail:</b>
                                {user.email}
                            </li>
                            <li className='list-group-item'>
                                <b>Type:</b>
                                {user.type}
                            </li>
                            <li className='list-group-item'>
                                <b>Mot de passe</b>
                                {user.password}
                            </li>
                        </ul>
                    </div>
                </div>
                <Link className='btn btn-primary my-2' to={"/"}></Link>
            </div>
        </div>
    </div>
  )
}
