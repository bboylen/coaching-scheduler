Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: [:index]
      resources :slots, only: [:create, :index] do
        collection do
          get 'coach/:id', to: 'slots#for_coach'
          get 'available', to: 'slots#available'
        end
      end
      resources :bookings, only: [:create, :update] do
        collection do
          get 'coach/:id', to: 'bookings#for_coach'
          get 'student/:id', to: 'bookings#for_student'
        end
      end
    end
  end
end
