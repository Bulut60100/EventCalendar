![Screenshot at 2022-04-03 16-35-43](https://user-images.githubusercontent.com/56533891/161439106-aa6e0321-cb04-4344-a906-8095146325de.png)

###Event Calendar

##Projeyi docker üzerinde ayağa kaldırma

#Acount Service
1. accountService klasörü içine girerek docker-compose up --build komutu ile accountService yi ayağa kaldır.
2. Docker exec -it accountservice_account_1 sh komutu ile docker containeri içerisine gir.
3. php artisan migrate komutu ile veritabanını içeri aktar.
bu 3 adımı uyguladıktan sonra accountService miz hazır şimdi calendarServiceyi ayağa kaldıracağız

#Calendar Service
1. calendarService klasörü içine girerek docker-compose up --build komutu ile CalendarService yi ayağa kaldır.
2. docker exec -it calendarservice_calendar_1 komutu ile docker containeri içerisine gir.
3. php artisan migrate komutu ile veritabanını içeri aktar.
ve accountService mizde hazır şimdi arayüzü ayağı kaldıracağı<.

#FrontEnd
1. calendarApp klasörü içine girerek docker-compose up --build komutu ile FrontEnd i ayağa kaldır.
son adımımızıda yaparak projemiz hazır hale geldi.

#Arayüz adresi
http://localhost:3000/ adresi ile projemizi açıyoruz. Karşımıza gelen ekranda kullanıcı kaydımızı yapıyoruz ve bizi takvimimize yönlendiriyor.
yeni bir event oluşturmak için gün sayılarının üstüne tıklayarak eventimizi oluşturuyoruz. Oluşturduğumuz eventi güncellemek ve silmek içinde eventin üstüne tıklayarak güncelleyip siliyoruz.

#Endpoint
http://localhost:8000/api/register
//Kullanıcı kayıt. name, email, password. METHOD: POST
http://localhost:8000/api/login
//Kullanıcı giriş. email, password. METHOD: POST
http://localhost:8000/api/logout
//Kullanıcı çıkış. Bearer + token(kullanıcı kayıt olduktan sonra oluşturulan token). METHOD: POST

http://localhost:8001/api/events
//Tüm eventleri görüntüle. METHOD: GET
http://localhost:8001/api/event/{id}
//Seçilen id deki eventi görüntüle. METHOD: GET
http://localhost:8001/api/event
//Yeni event oluştur title, description, date(unixtime), userid. METHOD: POST
http://localhost:8001/api/event/{id}
//Event güncelleme. title, description, date(unixtime), userid. METHOD: PUT
http://localhost:8001/api/event/{id}
//Event sil. METHOD: GET

#Anahtar Kodu
gAAAAABiMFMZ1OWEeJZ0f9Kt4b4ULUDeGWzOEW1ib0H_EdZo1Gpla1k5_rgqcspwMt_C5oZVhSLjRrUo8DgefzJXwYirCPbLu3quHNgVJgst8tsjuFLrvNUPemYVmePIs2XrMLV4H3cicOfUy3XMhXgtOX78LTZtbzKvnxitUCCDyZ_Qc-cIzxAJJvT4NZJ-kaoOGLn3EAP9HYIR9aEW4zTSCIscv7Msm1q2NITnAxfmQn5eQkp4xfWrBPxFP5Yevv30cE0a_qX4







