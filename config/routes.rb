Rails.application.routes.draw do
  resources :comments

  root 'dashboard#index'
end
