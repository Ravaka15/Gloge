<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Client extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'idClient' => [
                'type' => 'INT',
                'constraint' => '5',
                'auto_increment' => true
            ],
            'firstName' => [
                'type'       => 'VARCHAR',
                'constraint' => '100',
            ],
            'lastName' => [
                'type'       => 'VARCHAR',
                'constraint' => '100',
            ],
            'sexe' => [
                'type'       => 'VARCHAR',
                'constraint' => '20',
            ],
            'birth' => [
                'type'       => 'VARCHAR',
                'constraint' => '100',
            ],
            'adress' => [
                'type'       => 'VARCHAR',
                'constraint' => '200',
            ],
            'phone' => [
                'type'       => 'VARCHAR',
                'constraint' => '13',
            ],
            'email' => [
                'type'       => 'VARCHAR',
                'constraint' => '100',
            ],
            ]);
        $this->forge->addKey('idClient',true);
        $this->forge->createTable('client');
    }

    public function down()
    {
        //
    }
}
