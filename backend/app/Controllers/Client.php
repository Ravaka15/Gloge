<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\ClientModel;

class Client extends ResourceController
{
    
    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    use ResponseTrait;
    public function index()
    {
        $model = new ClientModel();
        $data = $model->findAll();
        return $this->respond($data);
    }

    /**
     * Return the properties of a resource object
     *
     * @return mixed
     */
    public function show($id = null)
    {
        $model = new ClientModel();
        $data = $model->findAll(['idClient' =>$idClient]);
        if(!$data) return $this->FailNotFound('Not Data Found');
        return $this->respond($data[0]);
    }

    /**
     * Return a new resource object, with default properties
     *
     * @return mixed
     */
    public function new()
    {
        //
    }

    /**
     * Create a new resource object, from "posted" parameters
     *
     * @return mixed
     */
    public function create()
    {
        helper(['form']);
        $rules = [
            'firstName' => 'required',
            'lastName' => 'required',
            'sexe' =>'required',
            'birth' => 'required',
            'adress' =>'required',
            'phone' =>'required',
            'email' =>'required'
        ];
        $data = [
            'firstName' => $this->request->getVar('firstName'),
            'lastName' => $this->request->getVar('lastName'),
            'sexe' => $this->request->getVar('sexe'),
            'birth' => $this->request->getVar('birth'),
            'adress' => $this->request->getVar('adress'),
            'phone' => $this->request->getVar('phone'),
            'email'  => $this->request->getVar('email'),
        ];
        if(!$this->validate($rules)) return $this->fail($this->validator->getErrors());
        $model = new ClientModel();
        $model->save($data);
        $response = [
            'status'   => 201,
            'error'    => null,
            'data'     => $data,
            'messages' => [
                'success' => 'Creation client reussi'
            ]
        ];
        return $this->respondCreated($response);
    }

    /**
     * Return the editable properties of a resource object
     *
     * @return mixed
     */
    public function edit($id = null)
    {
        //
    }

    /**
     * Add or update a model resource, from "posted" properties
     *
     * @return mixed
     */
    public function update($id = null)
    {
        helper(['form']);
        $rules = [
            'firstName' => 'required',
            'lastName' => 'required',
            'sexe' =>'required',
            'birth' => 'required',
            'adress' =>'required',
            'phone' =>'required',
            'email' =>'required'
        ];
        $data = [
            'firstName' => $this->request->getVar('firstName'),
            'lastName' => $this->request->getVar('lastName'),
            'sexe' => $this->request->getVar('sexe'),
            'birth' => $this->request->getVar('birth'),
            'adress' => $this->request->getVar('adress'),
            'phone' => $this->request->getVar('phone'),
            'email'  => $this->request->getVar('email'),
        ];
        if(!$this->validate($rules)) return $this->fail($this->validator->getErrors());
        $model = new ClientModel();
        $findById = $model->find(['idClient' => $id]);
        if(!$findById) return $this->failNotFound('Client n-existe pas');
        $model->update($id,$data);
        $response = [
            'status'   => 200,
            'error'    => null,
            'data'     => $data,
            'messages' => [
                'success' => 'Modification client reussi'
            ]
        ];
        return $this->respond($response);
    }

    /**
     * Delete the designated resource object from the model
     *
     * @return mixed
     */
    public function delete($id = null)
    {
        $model = new ClientModel();
        $findById = $model->find(['idClient' => $id]);
        if(!$findById) return $this->failNotFound('Client n-existe pas');
        $model->delete($id);
        $response = [
            'status'   => 200,
            'error'    => null,
            'data'     => $data,
            'messages' => [
                'success' => 'Supression client reussi'
            ]
        ];
        return $this->respond($response);
    }
}
