CONNECTION_STRING = mongodb+srv://ngominhdai92tn:Huynhnhu97@cluster0.ga1sb.mongodb.net/AMDB?retryWrites=true&w=majority

setup:
	npm install -g @nestjs/cli
	npm install

run:
	make setup
	npm run start:dev

mongo-backup:
	mongoexport --uri="${CONNECTION_STRING}" --collection=${schema} --out=migration/${schema}.json --pretty --jsonArray

mongo-migrateup:
	mongoimport --uri="${CONNECTION_STRING}" --collection=${schema} --file=migration/${schema}.json --jsonArray

mongo-migratedown:
	mongo "${CONNECTION_STRING}" --eval 'db.${schema}.drop()'