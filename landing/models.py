import datetime
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import ugettext_lazy as _

#test
class nametest(models.Model):
    name = models.CharField(max_length=100, verbose_name="Название теста")
    test_summa = models.FloatField(verbose_name="Сумма баллов для сдачи теста", default=0)
    time_of_test = models.IntegerField(verbose_name="Время, мин:", default=0)
    poryad = models.BooleanField(verbose_name="Вопросы по порядку", default=False)
    created = models.DateTimeField(auto_now_add=True, auto_now=False)
    updated = models.DateTimeField(auto_now_add=False, auto_now=True)

    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name = u'Тесты '
        verbose_name_plural = 'Тесты'


class Question(models.Model):
    title = models.CharField(max_length=200, verbose_name="Вопрос",blank=True, null=True, default=None)
    test_id = models.ForeignKey(nametest)
    summa = models.IntegerField(verbose_name="Сумма",blank=True, null=True, default=0)
    tip = models.BooleanField(verbose_name="Несколько правильных ответов", default=False)

    def __unicode__(self):
        return self.title

    class Meta:
        verbose_name = u'Вопрос'
        verbose_name_plural = 'Вопросы'


class Answer(models.Model):
    question_id = models.ForeignKey(Question)
    answer = models.CharField(max_length=200, verbose_name="Ответ")
    is_True = models.BooleanField(verbose_name="Правильный ответ")

    def __unicode__(self):
        return self.answer

    class Meta:
        verbose_name = 'Ответ'
        verbose_name_plural = 'Ответы'


class users(models.Model):
    ab = models.IntegerField(default=0)
    id_testa = models.IntegerField(default=0)


class results(models.Model):
    user = models.IntegerField(default=0)
    test = models.IntegerField(default=0)
    one_pop = models.NullBooleanField(verbose_name="Первая попытка")
    two_pop = models.NullBooleanField(verbose_name="Вторая попытка")
    nomer_pop = models.IntegerField(default=0)
    one_pop_bal = models.FloatField(verbose_name="Баллов в первой попытке", default=0)
    two_pop_bal = models.FloatField(verbose_name="Баллов во второй попытке", default=0)
