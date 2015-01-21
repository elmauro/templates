class CreateTables < ActiveRecord::Migration
  def change
    create_table :tables do |t|
      t.string :name
      t.string :description
      t.boolean :tabular
      t.integer :template_id
      t.integer :table_id

      t.timestamps
    end
  end
end
