# frozen_string_literal: true

class CreateAppointments < ActiveRecord::Migration[7.2]
  def change
    create_table :appointments do |t|
      t.datetime :time
      t.integer :student_id
      t.integer :customer_id

      t.timestamps
    end
  end
end
