# frozen_string_literal: true

class MergeAdminsAndCustomers < ActiveRecord::Migration[7.2]
  def change
    drop_table :admins
    drop_table :customers

    create_table :users do |t|
      ## Database authenticatable
      t.string :email,              null: false, default: ''
      t.string :encrypted_password, null: false, default: ''
      t.integer :role, null: false, default: 0

      ## Recoverable
      t.string   :reset_password_token
      t.datetime :reset_password_sent_at

      t.timestamps null: false
    end

    add_index :users, :email,                unique: true
    add_index :users, :reset_password_token, unique: true
  end
end
