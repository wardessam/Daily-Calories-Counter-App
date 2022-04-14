json.extract! food, :id, :name, :picture,:calories,:servingQuantity, :created_at, :updated_at
json.url food_url(food, format: :json)
