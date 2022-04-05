Rails.application.routes.draw do

  root 'home#index'
  
  match '/home/login', :controller => 'home', :action => 'login', :via => :post
  match '/home/signup', :controller => 'home', :action => 'signup', :via => :post
  
  get '/user', to: 'home#index', as: 'user'
  get '/admin', to: 'home#index', as: 'admin'
end
