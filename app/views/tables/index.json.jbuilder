json.array!(@tables) do |table|
  json.extract! table, :id, :name, :description, :tabular, :template_id, :table_id
  json.url table_url(table, format: :json)
end
