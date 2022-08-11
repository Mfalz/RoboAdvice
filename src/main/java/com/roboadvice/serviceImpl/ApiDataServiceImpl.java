package com.roboadvice.serviceImpl;


import com.jimmoores.quandl.DataSetRequest;
import com.jimmoores.quandl.QuandlSession;
import com.jimmoores.quandl.TabularResult;
import com.roboadvice.model.ApiData;
import com.roboadvice.model.Assets;
import com.roboadvice.repository.ApiDataRepository;
import com.roboadvice.repository.AssetsRepository;
import com.roboadvice.service.ApiDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.threeten.bp.Period;

import java.math.BigDecimal;
import java.time.LocalDate;

@Service
public class ApiDataServiceImpl implements ApiDataService{

    private ApiDataRepository apiDataRepository;
    private AssetsRepository assetsRepository;

    @Value("${quandl.api-key}")
    private String quandlApiKey;

    @Autowired
    public ApiDataServiceImpl(ApiDataRepository apiDataRepository, AssetsRepository assetsRepository) {
        this.apiDataRepository = apiDataRepository;
        this.assetsRepository = assetsRepository;
    }

    @Override
    public boolean firstInsert() {
        int j;
        Iterable<Assets> assetsList = assetsRepository.findAll();
        ApiData api;
        for (Assets asset : assetsList) {
            QuandlSession session = QuandlSession.create(quandlApiKey);
            TabularResult tabularResult = session.getDataSet(
                    DataSetRequest.Builder
                            .of(asset.getApi_data_src())
                            .withColumn(asset.getColumn_num())
                            .withStartDate(org.threeten.bp.LocalDate.of(2012,01,01))
                            .withEndDate(org.threeten.bp.LocalDate.now().minus(Period.ofDays(1)))
                            .build());
            j = 0;
            while (j < tabularResult.size()) {
                api = new ApiData(0, LocalDate.parse(tabularResult.get(j).getString(0)), BigDecimal.valueOf(tabularResult.get(j).getDouble(1)), asset);
                //insert(api);
                apiDataRepository.save(api);
                j++;
            }
        }
        return true;
    }

    @Override
    public ApiData insert(ApiData ad) {
        if(apiDataRepository.findByAssetsIdAndDate(ad.getAssets().getId(), ad.getDate()) == null)
            return apiDataRepository.save(ad);
        else
            return null;
    }
}
