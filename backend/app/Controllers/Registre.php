<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\UserModel;

class Registre extends ResourceController
{
    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    use ResponseTrait;
    public function index()
    {

        helper(['form']);
        $rules = [
            
            'email' => 'required|valid_email|is_unique[users.email]',
            'password' => 'required|min_length[8]',
            'confpassword' => 'matches[password]'
        ];
        if(!$this->validate($rules)) return $this->fail($this->validator->getErrors());
        $data = [
            'nom'       => $this->request->getVar('nom'),
            'telephone' => $this->request->getVar('telephone'),
            'email'     => $this->request->getVar('email'),
            'password'  => password_hash($this->request->getVar('password'), PASSWORD_BCRYPT)
        ];
        $model = new UserModel();
        $registered = $model->save($data);
        $this->respondCreated($registered);
    }
}