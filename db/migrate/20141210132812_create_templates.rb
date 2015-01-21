class CreateTemplates < ActiveRecord::Migration
  def change
    create_table :templates do |t|
      t.string :name
      t.string :description
      t.text :template
      t.integer :area_id

      t.timestamps
    end
  end
end
