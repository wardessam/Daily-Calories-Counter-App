class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :email
      t.string :name
      t.string :password_digest
      t.string :dailycalories_needed
      t.string :dailycalories_remaining
      t.string :dateoftoday

      t.timestamps
    end
  end
end
