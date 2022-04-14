Rails.application.routes.draw do
  resources :users
  resources :foods
  resources :registration , only: [:create]
  resources :sessions , only: [:create]
  post 'login',to: 'sessions#create'
  post '/register', to: 'registration#create'
  post '/update_calories', to: 'users#update_calories'
  post '/add_food',to: 'foods#create'

end
