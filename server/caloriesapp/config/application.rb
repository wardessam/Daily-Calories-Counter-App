require_relative "boot"

require "rails/all"
Bundler.require(*Rails.groups)

module Caloriesapp
  class Application < Rails::Application
    config.load_defaults 7.0
    
    config.api_only = true
    config.session_store :cookie_store, key: '_caloriesapp'
    config.middleware.use ActionDispatch::Cookies # Required for all session management
    config.middleware.use ActionDispatch::Session::CookieStore, config.session_options
  end
end
