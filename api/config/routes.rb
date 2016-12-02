Rails.application.routes.draw do
  devise_for :users, controllers: { passwords: 'passwords', omniauth_callbacks: 'users/omniauth_callbacks' }, skip: [:sessions]

  as :user do
    get 'logout', to: 'devise/sessions#destroy', as: :destroy_user_session
  end

  namespace :api do
    namespace :v1 do
      delete 'logout', to: 'sessions#signout'

      get :me, to: 'users#me'

      get :pipl, to: 'pipl#find'
    end
  end

  root to: 'root#index'
end
