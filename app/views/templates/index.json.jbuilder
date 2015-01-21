json.array!(@templates) do |template|
  json.extract! template, :id, :name, :description, :template, :area_id
  json.url template_url(template, format: :json)
end
