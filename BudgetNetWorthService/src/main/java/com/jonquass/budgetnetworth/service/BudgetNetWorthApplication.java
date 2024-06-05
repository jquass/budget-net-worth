package com.jonquass.budgetnetworth.service;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.jonquass.budgetnetworth.data.BudgetNetWorthDataModule;
import com.jonquass.budgetnetworth.data.jdbi.GuiceJdbi;
import com.jonquass.budgetnetworth.service.config.BudgetNetWorthConfiguration;
import com.jonquass.budgetnetworth.service.resources.AccountResource;
import com.jonquass.budgetnetworth.service.resources.DashboardResource;
import com.mysql.cj.jdbc.MysqlDataSource;
import io.dropwizard.core.Application;
import io.dropwizard.core.setup.Bootstrap;
import io.dropwizard.core.setup.Environment;

import javax.sql.DataSource;

public class BudgetNetWorthApplication extends Application<BudgetNetWorthConfiguration> {

    private static Injector injector;

    public static void main(String[] args) throws Exception {
        new BudgetNetWorthApplication()
                .run(args);
    }

    @Override
    public void initialize(Bootstrap<BudgetNetWorthConfiguration> bootstrap) {
        MysqlDataSource mysqlDataSource = getDataSource();
        injector = Guice.createInjector(new BudgetNetWorthDataModule(),
                binder -> binder.bind(DataSource.class).annotatedWith(GuiceJdbi.class).toInstance(mysqlDataSource));
        injector.injectMembers(this);
    }

    private MysqlDataSource getDataSource() {
        MysqlDataSource mysqlDS = new MysqlDataSource();
        mysqlDS.setDatabaseName(System.getenv("MYSQL_DATABASE_NAME"));
        mysqlDS.setServerName(System.getenv("MYSQL_SERVER_NAME"));
        mysqlDS.setPort(Integer.parseInt(System.getenv("MYSQL_PORT")));
        mysqlDS.setUser(System.getenv("MYSQL_USER"));
        mysqlDS.setPassword(System.getenv("MYSQL_PASSWORD"));
        return mysqlDS;
    }

    @Override
    public void run(BudgetNetWorthConfiguration configuration, Environment environment) {
        environment.jersey().register(injector.getInstance(DashboardResource.class));
        environment.jersey().register(injector.getInstance(AccountResource.class));
    }

}