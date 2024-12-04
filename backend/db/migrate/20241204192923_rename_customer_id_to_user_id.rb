class RenameCustomerIdToUserId < ActiveRecord::Migration[7.2]
  def change
    rename_column :appointments, :customer_id, :user_id
  end
end
