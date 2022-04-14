json.extract! user, :id, :email, :name, :password_digest, :dailycalories_needed, :dailycalories_remaining, :dateoftoday, :created_at, :updated_at
json.url user_url(user, format: :json)
