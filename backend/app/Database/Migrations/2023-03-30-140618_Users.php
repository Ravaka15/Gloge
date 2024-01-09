<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Users extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type' => 'INT',
                'constraint' => '5',
                'auto_increment' => true
            ],
            'nom' => [
                'type'       => 'VARCHAR',
                'constraint' => '100',
            ],
            'telephone' => [
                'type'       => 'VARCHAR',
                'constraint' => '13',
            ],
            'email' => [
                'type'       => 'VARCHAR',
                'constraint' => '100',
            ],
            'password' => [
                'type'       => 'VARCHAR',
                'constraint' => '100'
            ]
            ]);
        $this->forge->addKey('id',true);
        $this->forge->createTable('users');
    }

    public function down()
    {
        //
    }
}
