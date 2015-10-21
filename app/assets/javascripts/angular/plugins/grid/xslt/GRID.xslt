<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <xsl:for-each select="//properties">
      <xsl:variable name="entity" select="@entity" />
        <div class="panel panel-default" ng-show="showList">
          <div class="panel-body">
            <div class="row">
              <div class="col-md-4 col-xs-12 col-sm-12">
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="{@name}" ng-model="{$entity}.filter" ng-keypress="searchOnEnter($event)" />
                  <span class="input-group-btn">
                    <button class="btn btn-primary" type="button" ng-click="search($event)">Search</button>
                  </span>
                </div>
              </div>
              <div class="col-md-2 col-xs-12 col-sm-12"></div>
              <div class="col-md-4 col-xs-12 col-sm-12"></div>
              <div class="col-md-2 col-xs-12 col-sm-12">
                <button class="btn btn-primary" ngf-change="upload($files)">Select CSV file</button>
              </div>
            </div>
            <table id="tbl{$entity}" width="100%" class="table table-striped table-hover user-table-top users-panel">
              <thead>
                <tr>
                  <xsl:for-each select="//control">   
                    <th class="col-md-3 col-xs-6 col-sm-4"><xsl:value-of select="@description"/></th>
                  </xsl:for-each>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr ng-repeat="{$entity} in {$entity}List">
                  <xsl:for-each select="//control">   
                    <td class="col-md-3 col-xs-6 col-sm-4"><strong>{{<xsl:value-of select="../properties/@entity"/>.<xsl:value-of select="@name"/>}}</strong></td>
                  </xsl:for-each>
                  <td><a href="javascript:;" tooltip="EDIT" ng-click="edit({$entity})" ng-show="{$entity}.active"><i class="fa fa-pencil fa-lg"></i></a></td>
                  <td>
                    <a href="javascript:;" tooltip="DELETE" ng-click="delete({$entity})" ng-show="{$entity}.active"><i class="fa fa-trash fa-lg"></i></a>
                  </td>
                </tr>
                <tr ng-show="{$entity}List.length === 0">
                  <td colspan="11" class="text-center">Not Results Found</td>
                </tr>
              </tbody>
              <tfoot>

              </tfoot>
            </table>
            <div class="row">
              <div class="col-md-5 col-xs-12 col-sm-10" ng-show="showPaginate">
                <ul class="pagination-sm pagination ng-isolate-scope ng-valid" total-items="totalItems" max-size="maxSize" items-per-page="itemsPerPage" ng-model="currentPage" ng-change="pageChanged()">
                  <li class="ng-scope disabled"><a href="" class="ng-binding">Previous</a></li>
                  <li ng-repeat="n in range(1,pages)" class="ng-scope active"><a href="" class="ng-binding">{{n}}</a></li>
                  <li class="ng-scope disabled"><a href="" class="ng-binding">Next</a></li>
                </ul>
              </div>

              <div class="col-md-5 col-xs-10 col-sm-10 add-user-btn">
                <button type="button" class="btn btn-primary btn-circle btn-lg pull-right" ng-click="new()" tooltip="New"><i class="fa fa-user-plus"></i></button>
              </div>
            </div>
          </div>
        </div>
    </xsl:for-each>
  </xsl:template> 
</xsl:stylesheet>
