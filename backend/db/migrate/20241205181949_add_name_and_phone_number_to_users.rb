# frozen_string_literal: true

class AddNameAndPhoneNumberToUsers < ActiveRecord::Migration[7.2]
  def change
    add_column :users, :name, :string, null: false
    add_column :users, :phone_number, :string, null: false
  end
end
