Rails.application.routes.draw do
  namespace :api do
    namespace :v0 do
      namespace :Owner do
         mount_devise_token_auth_for 'Owner', at: 'admin_auth', skip: [:omniauth_callbacks]
      end
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
