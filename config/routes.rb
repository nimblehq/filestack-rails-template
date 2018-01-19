Rails.application.routes.draw do
  resources :users
  resources :comments

  root 'dashboard#index'
end
